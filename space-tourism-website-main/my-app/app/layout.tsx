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
        <div
          className="flex flex-col p-6 h-full gap-6 overflow-y-auto
         lg:p-0 lg:py-12
        "
        >
          {children}
        </div>
      </body>
    </html>
  );
}
