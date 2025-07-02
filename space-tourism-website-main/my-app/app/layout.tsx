import "./globals.css";
import { barlow, barlowCondensed, bellefair } from "./fonts";
import Header from "./components/Header";

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
        className={`bg-(image:--home-bg-current) bg-cover bg-center  
          font-main antialiased flex flex-col `}
      >
        <Header />

        <div className="flex flex-col p-6 h-full gap-6">{children}</div>
      </body>
    </html>
  );
}
