import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FuschiaRacer",
  description: "Made by Mohammed Mehdi",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black `}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
