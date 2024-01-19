import AuthTitle from "../AuthTitle";
// import { getServerAuthSession } from "~/server/auth";
// import links from "~/app/core/constants/links";
// import { api } from "~/trpc/server";
// import { redirect } from "next/navigation";
// import FormBody from "./FormBody";

// FIXME: Remove this page since it is no longer needed, ever since 
export default function CompleteRegistration() {

  return (
    <>
      <AuthTitle title="Complete Registration" />

      <div className="mt-5">
        {/* Intro text */}
        <div className="mt-1 mb-4">
          <p className="text-center font-semibold text-cc-content-sub/50">Complete your account creation by filling up and submitting the below form. ✨</p>
        </div>
        <div className="h-2 w-full border-b-2 border-cc-border-main"></div>
        
        {/* Form */}
        {/* <FormBody /> */}

      </div>
    </>
  );
}