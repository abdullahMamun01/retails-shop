import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Headers from "@/components/layout/Headers/Headers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";

import { cn } from "@/lib/utils";
import Provider from "./provider/Provider";
import { Toaster } from "react-hot-toast";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "LWS-KART",
  description: "A personal retail shop"
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Toaster position="top-right" reverseOrder={false} />
        <Provider>
          <Headers />
          <Navbar />
          {children}
        </Provider>

        <Footer />
      </body>
    </html>
  );
}
