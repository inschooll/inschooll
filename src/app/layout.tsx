import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { TRPCReactProvider } from "~/trpc/react";
import type { Ttheme } from "./utils/types";
import AppHotKeys from "~/components/app-hot-keys";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Inschooll",
  description: "A school management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = cookies().get("theme")?.value as Ttheme;
  if (!theme) cookies().set("theme", "system");

  return (
    <html lang="en" data-theme={theme ?? "system"}>
      <body
        className={`h-full bg-cc-background font-sans text-cc-content ${inter.className} antialiased`}
      >
        <NextTopLoader showSpinner={false} color="#54a0ff" shadow={""} />
        <AppHotKeys>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </AppHotKeys>
      </body>
    </html>
  );
}
