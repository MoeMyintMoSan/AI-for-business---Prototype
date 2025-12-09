import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "StockWise AI - Smart Inventory Management",
  description: "AI-powered inventory management for Thai MSMEs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-sans antialiased bg-app`}>
        {children}
      </body>
    </html>
  );
}
