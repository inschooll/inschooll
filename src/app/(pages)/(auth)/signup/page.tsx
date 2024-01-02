import AuthTitle from "../AuthTitle";
import AuthGoogleButton from "../AuthGoogleButton";
import Link from "next/link";
import links from "~/app/core/constants/links";
import FormBody from "./body";
import { cookies } from "next/headers";
import constants from "~/app/core/constants/constants";
import { redirect } from "next/navigation";

export default function Signup() {
  const updateAuthToken = async (token: string) => {
    "use server";
    await Promise.all([]);
    const cookieStore = cookies();
    cookieStore.set(constants.tokenName, token);
    redirect(links.purpose);
  };

  return (
    <>
      <AuthTitle title="Sign up" />

      <div className="mt-5">
        {/* <AuthGoogleButton /> */}
        <FormBody setAuthToken={updateAuthToken} />

        <div className="mt-10 text-center text-cc-content-main/80">
          Already have an account ?
          <Link href={links.login}>
            <span className="ml-2 text-cc-primary-main underline">Log in</span>
          </Link>
        </div>
      </div>
    </>
  );
}
