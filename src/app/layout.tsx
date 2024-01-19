import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import type { Metadata } from "next";
import PopUps from "~/components/popups/PopUps";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: 'Inschooll',
  description: 'A school management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`h-full bg-cc-background-main text-cc-content-main font-sans ${inter.className} antialiased`}>
        <PopUps />

        <TRPCReactProvider headers={headers()}>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}