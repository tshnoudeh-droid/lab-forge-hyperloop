import type { Metadata } from "next";
import { Libre_Baskerville } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Forge Hyperloop Lab",
  description: "Engineering specifications for the Forge Hyperloop DX-I program.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={libreBaskerville.variable}>
      <body>
        <ThemeProvider>
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
