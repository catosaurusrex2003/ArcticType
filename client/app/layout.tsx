import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import { GlobalContextProvider } from "@/context/globalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DonkeyType",
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
        <GlobalContextProvider>
          <Navbar />
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  );
}
