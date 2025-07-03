import "./globals.css";
import { barlow, barlowCondensed, bellefair } from "./fonts";
import Header from "./components/Header";
import PageBackground from "./PageBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${barlow.variable} ${bellefair.variable}`}
    >
      <body
        className={`
          font-main h-screen antialiased flex flex-col `}
      >
        <Header />

        <PageBackground imageClass="bg-(image:--home-bg-current)" />
        <div className="flex flex-col p-6 lg:p-0 lg:py-12 h-full  gap-6 overflow-y-auto ">
          {children}
        </div>
      </body>
    </html>
  );
}
