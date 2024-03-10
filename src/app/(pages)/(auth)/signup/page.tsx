import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import constants from "~/lib/constants/constants";
import links from "~/lib/constants/links";
import AuthTitle from "../AuthTitle";
import FormBody from "./body";

export default function Signup() {
  const updateAuthToken = async (token: string) => {
    "use server";
    await Promise.all([]);
    const cookieStore = cookies();
    cookieStore.set(constants.tokenName, token);
    redirect(links.purpose);
  };

  console.log('Sign up!!!');

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
