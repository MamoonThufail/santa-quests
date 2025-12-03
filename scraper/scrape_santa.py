"""
Santa Browser Website Scraper
Extracts all assets, styles, and design elements using Selenium
"""

import os
import re
import json
import time
import base64
import hashlib
import requests
from urllib.parse import urljoin, urlparse
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
from PIL import Image
from io import BytesIO

# Configuration
TARGET_URL = "https://santabrowser.com/"
OUTPUT_DIR = Path(__file__).parent / "scraped_assets"
PROXY = None  # Set to "http://proxy:port" or "socks5://proxy:port" if needed

# Create output directories
DIRS = {
    "images": OUTPUT_DIR / "images",
    "css": OUTPUT_DIR / "css",
    "fonts": OUTPUT_DIR / "fonts",
    "svg": OUTPUT_DIR / "svg",
    "data": OUTPUT_DIR / "data",
}

for dir_path in DIRS.values():
    dir_path.mkdir(parents=True, exist_ok=True)


def setup_driver(proxy=None, headless=True):
    """Setup Chrome driver with options for scraping"""
    options = Options()

    if headless:
        options.add_argument("--headless=new")

    # Anti-detection measures
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--start-maximized")
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-infobars")

    # Realistic user agent
    options.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    )

    # Proxy support
    if proxy:
        options.add_argument(f"--proxy-server={proxy}")

    # Additional preferences
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option("useAutomationExtension", False)

    # Enable performance logging for network requests
    options.set_capability("goog:loggingPrefs", {"performance": "ALL"})

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    # Remove webdriver property
    driver.execute_script(
        "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
    )

    return driver


def extract_network_requests(driver):
    """Extract all network requests from performance logs"""
    assets = {
        "images": [],
        "css": [],
        "fonts": [],
        "other": []
    }

    logs = driver.get_log("performance")

    for log in logs:
        try:
            message = json.loads(log["message"])["message"]
            if message["method"] == "Network.responseReceived":
                response = message["params"]["response"]
                url = response["url"]
                mime_type = response.get("mimeType", "")

                if any(ext in url.lower() for ext in [".png", ".jpg", ".jpeg", ".webp", ".gif"]) or "image" in mime_type:
                    assets["images"].append(url)
                elif ".css" in url.lower() or "text/css" in mime_type:
                    assets["css"].append(url)
                elif any(ext in url.lower() for ext in [".woff", ".woff2", ".ttf", ".otf", ".eot"]) or "font" in mime_type:
                    assets["fonts"].append(url)
                elif ".svg" in url.lower():
                    assets["images"].append(url)
        except (KeyError, json.JSONDecodeError):
            continue

    return assets


def extract_colors_from_styles(driver):
    """Extract all colors used in the page"""
    colors = set()

    # Get all computed styles
    script = """
    const colors = new Set();
    const elements = document.querySelectorAll('*');

    elements.forEach(el => {
        const styles = window.getComputedStyle(el);
        const props = [
            'color', 'backgroundColor', 'borderColor',
            'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
            'outlineColor', 'textDecorationColor', 'boxShadow', 'textShadow',
            'backgroundImage'
        ];

        props.forEach(prop => {
            const value = styles.getPropertyValue(prop);
            if (value && value !== 'none' && value !== 'rgba(0, 0, 0, 0)') {
                colors.add(value);
            }
        });
    });

    return Array.from(colors);
    """

    computed_colors = driver.execute_script(script)

    # Parse and normalize colors
    hex_pattern = re.compile(r'#[0-9a-fA-F]{3,8}')
    rgb_pattern = re.compile(r'rgba?\([^)]+\)')

    for color in computed_colors:
        hex_matches = hex_pattern.findall(str(color))
        rgb_matches = rgb_pattern.findall(str(color))
        colors.update(hex_matches)
        colors.update(rgb_matches)

    return list(colors)


def extract_fonts(driver):
    """Extract font families used"""
    script = """
    const fonts = new Set();
    const elements = document.querySelectorAll('*');

    elements.forEach(el => {
        const fontFamily = window.getComputedStyle(el).fontFamily;
        if (fontFamily) {
            fonts.add(fontFamily);
        }
    });

    return Array.from(fonts);
    """

    return driver.execute_script(script)


def extract_gradients(driver):
    """Extract all gradient definitions"""
    script = """
    const gradients = new Set();
    const elements = document.querySelectorAll('*');

    elements.forEach(el => {
        const bg = window.getComputedStyle(el).backgroundImage;
        if (bg && bg.includes('gradient')) {
            gradients.add(bg);
        }
    });

    return Array.from(gradients);
    """

    return driver.execute_script(script)


def extract_svg_elements(driver):
    """Extract all inline SVG elements"""
    script = """
    const svgs = [];
    document.querySelectorAll('svg').forEach((svg, index) => {
        svgs.push({
            index: index,
            outerHTML: svg.outerHTML,
            width: svg.getAttribute('width'),
            height: svg.getAttribute('height'),
            viewBox: svg.getAttribute('viewBox'),
            className: svg.className.baseVal || svg.className
        });
    });
    return svgs;
    """

    return driver.execute_script(script)


def extract_images_from_dom(driver):
    """Extract image sources from DOM"""
    script = """
    const images = [];

    // Regular img tags
    document.querySelectorAll('img').forEach(img => {
        images.push({
            src: img.src,
            srcset: img.srcset,
            alt: img.alt,
            width: img.naturalWidth,
            height: img.naturalHeight
        });
    });

    // Background images
    document.querySelectorAll('*').forEach(el => {
        const bg = window.getComputedStyle(el).backgroundImage;
        if (bg && bg !== 'none' && bg.includes('url')) {
            const urlMatch = bg.match(/url\\(['"]?([^'"\\)]+)['"]?\\)/);
            if (urlMatch) {
                images.push({
                    src: urlMatch[1],
                    type: 'background',
                    element: el.tagName
                });
            }
        }
    });

    // Picture sources
    document.querySelectorAll('source').forEach(source => {
        if (source.srcset) {
            images.push({
                src: source.srcset,
                type: 'source',
                media: source.media
            });
        }
    });

    return images;
    """

    return driver.execute_script(script)


def extract_page_structure(driver):
    """Extract the HTML structure of key sections"""
    script = """
    const structure = {
        title: document.title,
        metaTags: [],
        headings: [],
        buttons: [],
        links: [],
        sections: []
    };

    // Meta tags
    document.querySelectorAll('meta').forEach(meta => {
        structure.metaTags.push({
            name: meta.name,
            property: meta.getAttribute('property'),
            content: meta.content
        });
    });

    // Headings
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
        structure.headings.push({
            tag: h.tagName,
            text: h.innerText,
            className: h.className
        });
    });

    // Buttons
    document.querySelectorAll('button, a[role="button"], .btn, [class*="button"]').forEach(btn => {
        structure.buttons.push({
            text: btn.innerText,
            className: btn.className,
            href: btn.href || null
        });
    });

    // Main sections
    document.querySelectorAll('section, header, footer, main, [class*="hero"], [class*="section"]').forEach(section => {
        structure.sections.push({
            tag: section.tagName,
            className: section.className,
            id: section.id
        });
    });

    return structure;
    """

    return driver.execute_script(script)


def download_asset(url, output_dir, session=None):
    """Download an asset and save it locally"""
    if not session:
        session = requests.Session()

    try:
        response = session.get(url, timeout=30)
        response.raise_for_status()

        # Generate filename
        parsed = urlparse(url)
        filename = os.path.basename(parsed.path)
        if not filename or '.' not in filename:
            # Generate hash-based filename
            ext = '.png'  # default
            content_type = response.headers.get('content-type', '')
            if 'svg' in content_type:
                ext = '.svg'
            elif 'jpeg' in content_type or 'jpg' in content_type:
                ext = '.jpg'
            elif 'webp' in content_type:
                ext = '.webp'
            elif 'gif' in content_type:
                ext = '.gif'
            elif 'css' in content_type:
                ext = '.css'
            elif 'font' in content_type or 'woff' in url:
                ext = '.woff2'

            filename = hashlib.md5(url.encode()).hexdigest()[:12] + ext

        filepath = output_dir / filename

        with open(filepath, 'wb') as f:
            f.write(response.content)

        print(f"  [OK] Downloaded: {filename}")
        return str(filepath), filename

    except Exception as e:
        print(f"  [FAIL] Failed to download {url}: {e}")
        return None, None


def take_full_screenshot(driver, output_path):
    """Take a full page screenshot"""
    # Get page dimensions
    total_height = driver.execute_script("return document.body.scrollHeight")
    viewport_height = driver.execute_script("return window.innerHeight")

    driver.set_window_size(1920, total_height)
    time.sleep(1)

    driver.save_screenshot(str(output_path))
    print(f"  [OK] Screenshot saved: {output_path}")


def main():
    print("=" * 60)
    print("Santa Browser Website Scraper")
    print("=" * 60)

    print(f"\n[1/8] Setting up Chrome driver...")
    driver = setup_driver(proxy=PROXY, headless=True)

    try:
        print(f"\n[2/8] Loading {TARGET_URL}...")
        driver.get(TARGET_URL)

        # Wait for page to fully load
        time.sleep(5)

        # Wait for any lazy-loaded content
        WebDriverWait(driver, 20).until(
            lambda d: d.execute_script("return document.readyState") == "complete"
        )

        # Additional wait for JS rendering
        time.sleep(3)

        print("\n[3/8] Extracting network requests...")
        network_assets = extract_network_requests(driver)

        print("\n[4/8] Extracting DOM elements...")
        dom_images = extract_images_from_dom(driver)
        svg_elements = extract_svg_elements(driver)
        page_structure = extract_page_structure(driver)

        print("\n[5/8] Extracting styles...")
        colors = extract_colors_from_styles(driver)
        fonts = extract_fonts(driver)
        gradients = extract_gradients(driver)

        print("\n[6/8] Taking screenshots...")
        take_full_screenshot(driver, OUTPUT_DIR / "full_page_screenshot.png")

        # Take viewport screenshot
        driver.set_window_size(1920, 1080)
        time.sleep(1)
        driver.save_screenshot(str(OUTPUT_DIR / "viewport_screenshot.png"))

        print("\n[7/8] Downloading assets...")
        session = requests.Session()
        session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        })

        downloaded_assets = {
            "images": [],
            "css": [],
            "fonts": [],
            "svg": []
        }

        # Download images
        all_image_urls = set(network_assets["images"])
        for img in dom_images:
            if img.get("src"):
                all_image_urls.add(img["src"])

        print(f"\n  Found {len(all_image_urls)} images...")
        for url in all_image_urls:
            if url.startswith("data:"):
                # Handle data URLs
                try:
                    header, data = url.split(",", 1)
                    ext = ".png"
                    if "svg" in header:
                        ext = ".svg"
                    elif "jpeg" in header or "jpg" in header:
                        ext = ".jpg"

                    filename = hashlib.md5(data[:100].encode()).hexdigest()[:12] + ext
                    filepath = DIRS["images"] / filename

                    decoded = base64.b64decode(data)
                    with open(filepath, 'wb') as f:
                        f.write(decoded)

                    downloaded_assets["images"].append({"url": "data:...", "file": filename})
                    print(f"  [OK] Decoded data URL: {filename}")
                except Exception as e:
                    print(f"  [FAIL] Failed to decode data URL: {e}")
            elif url.startswith("http"):
                filepath, filename = download_asset(url, DIRS["images"], session)
                if filepath:
                    downloaded_assets["images"].append({"url": url, "file": filename})

        # Download CSS
        print(f"\n  Found {len(network_assets['css'])} CSS files...")
        for url in network_assets["css"]:
            filepath, filename = download_asset(url, DIRS["css"], session)
            if filepath:
                downloaded_assets["css"].append({"url": url, "file": filename})

        # Download fonts
        print(f"\n  Found {len(network_assets['fonts'])} fonts...")
        for url in network_assets["fonts"]:
            filepath, filename = download_asset(url, DIRS["fonts"], session)
            if filepath:
                downloaded_assets["fonts"].append({"url": url, "file": filename})

        # Save SVG elements
        print(f"\n  Found {len(svg_elements)} inline SVGs...")
        for svg in svg_elements:
            filename = f"svg_{svg['index']}.svg"
            filepath = DIRS["svg"] / filename
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(svg["outerHTML"])
            downloaded_assets["svg"].append({"index": svg["index"], "file": filename})
            print(f"  [OK] Saved: {filename}")

        print("\n[8/8] Saving extracted data...")

        # Compile all data
        extracted_data = {
            "url": TARGET_URL,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "page_structure": page_structure,
            "design": {
                "colors": colors,
                "fonts": fonts,
                "gradients": gradients
            },
            "assets": {
                "network_requests": network_assets,
                "dom_images": dom_images,
                "svg_elements": [{"index": s["index"], "width": s["width"], "height": s["height"], "viewBox": s["viewBox"]} for s in svg_elements],
                "downloaded": downloaded_assets
            },
            "html_source": driver.page_source
        }

        # Save JSON data
        with open(DIRS["data"] / "extracted_data.json", 'w', encoding='utf-8') as f:
            json.dump(extracted_data, f, indent=2, default=str)

        # Save HTML source
        with open(DIRS["data"] / "page_source.html", 'w', encoding='utf-8') as f:
            f.write(driver.page_source)

        # Save a summary
        summary = f"""
Santa Browser Scrape Summary
============================
URL: {TARGET_URL}
Timestamp: {extracted_data['timestamp']}

Page Title: {page_structure.get('title', 'N/A')}

Design Elements:
- Colors found: {len(colors)}
- Fonts found: {len(fonts)}
- Gradients found: {len(gradients)}

Assets:
- Images downloaded: {len(downloaded_assets['images'])}
- CSS files: {len(downloaded_assets['css'])}
- Fonts: {len(downloaded_assets['fonts'])}
- Inline SVGs: {len(downloaded_assets['svg'])}

Headings:
{chr(10).join([f"  {h['tag']}: {h['text']}" for h in page_structure.get('headings', [])])}

Buttons:
{chr(10).join([f"  - {b['text']}" for b in page_structure.get('buttons', [])])}

Colors:
{chr(10).join([f"  {c}" for c in colors[:20]])}
{'  ... and more' if len(colors) > 20 else ''}

Gradients:
{chr(10).join([f"  {g[:100]}..." for g in gradients[:10]])}

Fonts:
{chr(10).join([f"  {f}" for f in fonts])}
"""

        with open(OUTPUT_DIR / "SUMMARY.txt", 'w', encoding='utf-8') as f:
            f.write(summary)

        print("\n" + "=" * 60)
        print("SCRAPING COMPLETE!")
        print("=" * 60)
        print(f"\nOutput directory: {OUTPUT_DIR}")
        print(f"- Screenshots: full_page_screenshot.png, viewport_screenshot.png")
        print(f"- Images: {DIRS['images']}")
        print(f"- CSS: {DIRS['css']}")
        print(f"- SVGs: {DIRS['svg']}")
        print(f"- Data: {DIRS['data']}")
        print(f"\nCheck SUMMARY.txt for a quick overview")
        print(f"Check data/extracted_data.json for complete data")

    except Exception as e:
        print(f"\n[ERROR] Error during scraping: {e}")
        import traceback
        traceback.print_exc()

    finally:
        driver.quit()
        print("\nDriver closed.")


if __name__ == "__main__":
    main()
