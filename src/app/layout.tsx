import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Universal Quality Roofing | Premium Roofing Services in Olympia WA",
  description: "Top-rated roofing contractor serving Olympia, WA. Get a free estimate for roof replacement, repair, and maintenance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
