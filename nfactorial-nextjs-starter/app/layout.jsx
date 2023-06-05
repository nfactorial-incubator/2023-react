import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import { Suspense } from "react";

export const metadata = {
  title: "My First Project",
  description:
    "Meet your AI Jeopardy expert.",
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center justify-center pt-16 relative">
          {children}
        </main>
        <Analytics />

      </body>
    </html>
  );
}
