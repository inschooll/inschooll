
import AuthTitle from "../AuthTitle";
import Link from "next/link";
import links from "~/app/core/constants/links";
import LoginFormBody from "./LoginFormBody";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import AuthGoogleButton from "../AuthGoogleButton";

export default async function Login() {
  const session = await getServerAuthSession();
  const profile = session?.user ? await api.profile.getProfileByUserId.query({userId: session?.user.id}) : null;

  if (session?.user && !profile) redirect(links.completeRegistration);
  // TODO: redirect to dashboard when the dashboard has been created
  if (session?.user) redirect(links.landingPage);

  return (
    <>
      <AuthTitle title="Log in" />

      <div className="mt-5">
        <AuthGoogleButton />
      </div>

      <LoginFormBody />

      <div className="mt-10">
        Don’t have an account ?
        <Link href={links.signup}>
          <span className="ml-2 text-cc-primary-main underline">Sign up</span>
        </Link>
      </div>
    </>
  );
}

