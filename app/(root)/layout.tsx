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
import { fetchUser } from "@/lib/actions/user.actions";
import { newNotificationCount } from "@/lib/actions/notification.actions";

const montserrat = Montserrat({ subsets: ["latin"] });

export const revalidate = 120;

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
  const userInfo = await fetchUser(user?.id);

  const newNotifCount = await newNotificationCount(user?.id);

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
            {userInfo && (
              <LeftSidebar
                username={userInfo.username!}
                newNotifCount={newNotifCount === 0 ? undefined : newNotifCount}
              />
            )}
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            {/* @ts-ignore */}
            {/* <RightSidebar /> */}
          </main>
          <Toaster />

          {user && (
            <Bottombar
              newNotifCount={newNotifCount === 0 ? undefined : newNotifCount}
            />
          )}
          {!user && <CallToAction />}
        </body>
        <Analytics />
      </html>
    </ClerkProvider>
  );
}
