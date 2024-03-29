import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/widgets/Header";
import { Providers } from "./Providers";
import Footer from "@/widgets/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
