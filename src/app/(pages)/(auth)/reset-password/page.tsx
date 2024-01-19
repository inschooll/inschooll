import { api } from "~/trpc/server";
import AuthTitle from "../AuthTitle";
import ResetPasswordForm from "./body";

export default async function ResetPasswordPage(props: {
  searchParams: Record<string, string>;
}) {
  const { reset_password_token } = props.searchParams;

  // Ensure link is in url params. TODO: redirect
  if (!reset_password_token) return <div>Not found</div>;

  // Ensure link in token is valid
  const payload = await api.password.decodeResetPasswordToken.query({
    token: reset_password_token,
  });

  // TODO: ensure token hasn't expired

  if (!payload?.resetPassword) return <div>Reset password has either expired or is invalid</div>;

  return (
    <>
      <AuthTitle title="Reset your Password" />

      <div className="mt-5">
        <ResetPasswordForm userId={payload.userId} />
      </div>
    </>
  );
}
