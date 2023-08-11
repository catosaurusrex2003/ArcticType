import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import { ReactQueryProvider } from "@/providers/reactQueryProvider";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ArcticType",
  description: "Made by Mohammed Mehdi",
  icons: {
    icon: "/icon2.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-glacier-background `}>
        <link
          rel="icon"
          href="/icon2.png>"
          type="image/png>"
          // sizes="<generated>"
        />
        <ReactQueryProvider>
          <Navbar />
          <div className=" mb-12 sm:mb-10">{children}</div>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
