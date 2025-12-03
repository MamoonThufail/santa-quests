@echo off
echo ==========================================
echo Santa Browser Website Scraper
echo ==========================================
echo.

cd /d "%~dp0"

echo Installing dependencies...
pip install -r requirements.txt

echo.
echo Running scraper...
python scrape_santa.py

echo.
echo Done! Check the scraped_assets folder.
pause
