"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import links from "../core/constants/links";
import Button from "../_components/buttons/button";
import Navbar from "../_components/navbar/navbar";
import { redirect, usePathname } from "next/navigation";

import { FcGoogle } from "react-icons/fc";
import { SessionProvider, useSession } from "next-auth/react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Body>{children}</Body>
    </SessionProvider>
  );
};

export default AuthLayout;

function Body({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const session = useSession();

  useEffect(() => {
    if ([links.login, links.signup].includes(path) && session.status === "authenticated") {
      redirect(links.completeRegistration);
    }
    if (path === links.completeRegistration && session.status === "unauthenticated") {
      redirect(links.login);
    }
  }, [path, session.status]);

  return (
    <>
      <Navbar />
      <div className="bg-red-4000 mx-auto my-5 mb-20 mt-10 flex min-h-[60vh] flex-col justify-center p-3 sm:w-96 sm:p-0">
        <h1 className="text-center text-xl font-bold sm:text-4xl">
          {path === links.login && "Log in"}
          {path === links.signup && "Sign up"}
          {path === links.completeRegistration && "Complete Registration"}
        </h1>

        <div className="mt-5">
          {path !== links.completeRegistration ? (
            <Link href={"/api/auth/signin"}>
              <Button variant={"outlineFull"} size={"sm"}>
                <div className="flex items-center justify-center gap-2">
                  <FcGoogle size={18} />
                  <span>Continue with Google</span>
                </div>
              </Button>
            </Link>
          ) : 
          (
            <>
              <div className="mt-1 mb-4">
                <p className="text-center font-semibold text-cc-content-sub/50">Finish up your account creation by filling up and submitting the below form. ✨</p>
              </div>
              <div className="h-2 w-full border-b-2 border-cc-border-main"></div>
            </>
          )
          }


          {children}

          {/* Bottom */}
          <div className="mt-5 text-center text-cc-content-main/70">
            {path === links.login && (
              <Link href={links.landingPage} className="hover:underline">
                <p>Forgot Password?</p>
              </Link>
            )}

            {path == links.login && (
              <div className="mt-5">
                Don’t have an account ?
                <Link href={links.signup}>
                  <span className="ml-2 text-cc-primary-main underline">
                    Sign up
                  </span>
                </Link>
              </div>
            )}
            {path == links.signup && (
              <div className="mt-10">
                Already have an account ?
                <Link href={links.login}>
                  <span className="ml-2 text-cc-primary-main underline">
                    Log in
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
