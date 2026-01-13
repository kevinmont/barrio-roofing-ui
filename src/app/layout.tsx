import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ibex Roof | Premium Roofing Services in Vancouver WA",
  description: "Top-rated roofing contractor serving Vancouver, Portland, and surrounding areas. Get a free estimate for roof replacement, repair, and maintenance.",
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
