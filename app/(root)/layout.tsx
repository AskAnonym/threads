import React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import "../globals.css";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";
import Topbar from "@/components/shared/Topbar";
import { Toaster } from "@/components/ui/toaster";

import { Analytics } from "@vercel/analytics/react";
import CallToAction from "@/components/shared/CallToAction";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moryeti | Anonym Social Platform",
  description: "Ask anonym questions!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#DF2085" },
      }}
    >
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.png" sizes="any" />
        </head>
        <body className={montserrat.className}>
          <Topbar />

          <main className="flex flex-row">
            {user && <LeftSidebar username={user.username!} />}
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            {/* @ts-ignore */}
            {/* <RightSidebar /> */}
          </main>
          <Toaster />

          {user && <Bottombar />}
          {!user && <CallToAction />}
        </body>
        <Analytics />
      </html>
    </ClerkProvider>
  );
}
