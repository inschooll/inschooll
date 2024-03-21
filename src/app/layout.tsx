import "~/styles/globals.css";

import { Inter } from "next/font/google";

import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import AppHotKeys from "~/components/app-hot-keys";
import { TRPCReactProvider } from "~/trpc/react";
import { getTheme } from "./actions";
import { Toaster } from "~/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Inschooll",
  description: "A school management system",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getTheme()

  return (
    <html lang="en" data-theme={theme ?? "system"}>
      <body
        className={`h-full bg-cc-background font-sans text-cc-content ${inter.className} antialiased`}
      >
        <NextTopLoader showSpinner={false} color="#54a0ff" shadow={""} height={2}  />
        <AppHotKeys>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </AppHotKeys>
        <Toaster />
      </body>
    </html>
  );
}

