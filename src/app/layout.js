import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "StockWise AI - Smart Inventory Management",
  description: "AI-powered inventory management for Thai MSMEs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} font-sans antialiased bg-app`}>
        {children}
      </body>
    </html>
  );
}
