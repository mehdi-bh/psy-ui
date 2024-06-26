import "@/src/styles/globals.css";
import { Providers } from "./providers";

import Sidebar from "@/src/components/Sidebar";
import { fontSans, fontMono } from "@/src/config/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${fontSans.variable} ${fontMono.variable}`} lang="en">
      <head>
        <title>Psy UI</title>
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <div className="flex h-screen">
            <Sidebar />
            <main className="light text-foreground bg-background flex-grow p-6">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
