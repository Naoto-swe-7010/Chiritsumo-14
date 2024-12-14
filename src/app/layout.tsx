import type { Metadata } from "next";
import "./globals.css";
import Header from "./_header/Header";
import Footer from "./_footer/Footer";

export const metadata: Metadata = {
  title: "ちりつも",
  description: "無駄な消費を我慢して欲しい物を手に入れよう！",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.ico",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-icon.ico",
    },
  },
  appleWebApp: true,
};
<meta name="apple-mobile-web-app-capable" content="yes"></meta>;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <Header />
        <div className="min-h-[calc(100vh-132px)] mt-[64px] px-[7%] sm:px-[5%]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
