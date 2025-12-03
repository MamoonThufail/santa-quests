import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Santa Quests | Browse. Earn. Repeat.",
  description: "The Browser That Keeps Giving - Join Santa Quests and earn rewards for your everyday browsing activities.",
  keywords: ["browse to earn", "web3", "crypto rewards", "santa browser", "quests"],
  authors: [{ name: "Santa Quests" }],
  icons: {
    icon: "/assets/favicon.png",
  },
  openGraph: {
    title: "Santa Quests | Browse. Earn. Repeat.",
    description: "The Browser That Keeps Giving",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Santa Quests | Browse. Earn. Repeat.",
    description: "The Browser That Keeps Giving",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} antialiased`} style={{ fontFamily: "var(--font-poppins), Poppins, system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
