import AuthTitle from "../AuthTitle";
import Link from "next/link";
import links from "~/lib/constants/links";
import LoginFormBody from "./body";
import { redirect } from "next/navigation";
// import AuthGoogleButton from "../AuthGoogleButton";
import { cookies } from "next/headers";
import constants from "~/lib/constants/constants";

export default function Login(props: {searchParams: Record<string, string>}) {
  console.log(props);
  const updateAuthToken = async (token: string) => {
    "use server";
    await Promise.all([]);
    const cookieStore = cookies();
    cookieStore.set(constants.tokenName, token);
    redirect(links.purpose);
  };
  return (
    <>
      <AuthTitle title="Log in" />

      <div className="mt-5">
        <LoginFormBody updateAuthToken={updateAuthToken} defaultEmail={props.searchParams.email} />

        <div className="mt-5 text-center">
          <span className="text-cc-content-main/80">Don’t have an account ?</span>

          <Link href={links.signup}>
            <span className="ml-2 text-cc-primary-main underline">Sign up</span>
          </Link>
        </div>
      </div>
    </>
  );
}

