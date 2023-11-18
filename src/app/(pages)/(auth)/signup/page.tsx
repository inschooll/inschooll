
import AuthTitle from "../AuthTitle";
import AuthGoogleButton from "../AuthGoogleButton";
import Link from "next/link";
import links from "~/app/core/constants/links";
import FormBody from "./FormBody";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

export default async function Signup() {
  const session = await getServerAuthSession();
  const profile = session?.user ? await api.profile.getProfileByUserId.query({userId: session?.user.id}) : null;

  if (session?.user && !profile) redirect(links.completeRegistration);
  // TODO: redirect to dashboard when the dashboard has been created
  if (session?.user) redirect(links.landingPage);

  return (
    <>
      <AuthTitle title="Sign up" />

      <div className="mt-5">
        <AuthGoogleButton />
        <FormBody />

        <div className="mt-10">
          Already have an account ?
          <Link href={links.login}>
            <span className="ml-2 text-cc-primary-main underline">
              Log in
            </span>
          </Link>
        </div>

      </div>
    </>
  );
};


