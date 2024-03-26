import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding",
  description: "Get started with Inschooll",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    {children}</>
  );
}
