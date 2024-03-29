import React from "react";
import TopNavbar from "~/components/navbar/navbar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNavbar />
      <div className="bg-red-4000 mx-auto my-5 mb-20 mt-10 flex min-h-[60vh] flex-col justify-center p-3 sm:w-96 sm:p-0">
          {children}
      </div>
    </>
  );
}

