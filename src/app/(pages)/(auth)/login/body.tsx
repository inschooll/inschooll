"use client";
import { useState } from "react";
// TODO: use zod instead of validator
import { isEmail } from "validator";
import errorMessages from "~/lib/constants/error-messages";
import successMessages from "~/lib/constants/success-messages";
import InfoBox from "~/components/cards/InfoBox";
import Input from "~/components/inputs/input";
import { getErrorMessage } from "~/lib/utils-client";
import { api } from "~/trpc/react";
// import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { LoginSchema, type TLoginSchema } from "~/lib/types";

type LoginFormBodyProps = {
  updateAuthToken: (token: string) => void;
  defaultEmail?: string;
};

export default function LoginFormBody(props: LoginFormBodyProps) {
  // store
  const methods = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { mutate: login, isLoading } = api.auth.login.useMutation({
    onError: (err) => {
      const message = getErrorMessage(err.message);
      setInputErrorMessage(message);
    },
    onSuccess: ({ authToken }) => {
      setSuccessMsg(successMessages.loginSuccessful);
      props.updateAuthToken(authToken);
    },
  });

  if (showForgotPasswordForm) {
    return (
      <ForgotPasswordForm
        setShowForgotPasswordForm={setShowForgotPasswordForm}
      />
    );
  }

  const onSubmit = (data: TLoginSchema) => {
    let [username, email] = ["", ""];
    if (isEmail(data.emailOrUsername)) email = data.emailOrUsername;
    else username = data.emailOrUsername;

    login({ username, email, password: data.password });
  };

  return (
    <div className="mt-5">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {inputErrorMessage ? (
            <InfoBox text={inputErrorMessage} type="error" />
          ) : (
            <></>
          )}
          {successMsg ? <InfoBox text={successMsg} type="success" /> : <></>}

          <div className="flex flex-col gap-2">
            {/* email or username */}
            <Input
              label="Email or Username"
              name="emailOrUsername"
              type="text"
              className="w-full"
              placeholder="Enter email or password"
            />
            {/* password */}
            <Input
              label="password"
              name="password"
              type="password"
              className="w-full"
              placeholder="Enter your password..."
            />
          </div>

          <div className="mt-7">
            <Button
              variant={"default"}
              size={"default"}
              type="submit"
              className="w-full"
              // TODO: Integrate loading in shadcn button
              // isLoading={isLoading}
            >
              Log in
            </Button>

            <div className="mt-7 text-center">
              <p
                className="cursor-pointer text-cc-content-main/80 transition duration-200 hover:text-cc-content-main"
                onClick={() => setShowForgotPasswordForm(true)}
              >
                Forgot password?
              </p>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

function ForgotPasswordForm({
  setShowForgotPasswordForm,
}: {
  setShowForgotPasswordForm: (v: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const { mutate: forgotPassword, isLoading } =
    api.password.sendResetPasswordLinkToEmail.useMutation({
      onError: (err) => {
        const message = getErrorMessage(err.message);
        setInputErrorMessage(message);
      },
      onSuccess: () => {
        setSuccessMsg(successMessages.resetPasswordEmailSent);
      },
    });

  return (
    <>
      <form>
        {inputErrorMessage ? (
          <InfoBox text={inputErrorMessage} type="error" />
        ) : (
          <></>
        )}
        {successMsg ? <InfoBox text={successMsg} type="success" /> : <></>}

        {/* email or username */}
        <Input
          label="Email"
          name="email"
          type="text"
          placeholder="Enter email address"
          className="w-full"
          onChange={(e) => setEmail(e.target.value)}
        />
      </form>

      <div className="mt-7">
        <Button
          variant={"default"}
          size={"default"}
          type="button"
          className="w-full rounded"
          // TODO: Integrate loading in shadcn button
          // isLoading={isLoading}
          onClick={() => {
            if (!email) return;
            if (!isEmail(email)) {
              setSuccessMsg("");
              return setInputErrorMessage(errorMessages.invalidEmail);
            }

            // submit
            setSuccessMsg("");
            setInputErrorMessage("");
            forgotPassword({ email });
          }}
        >
          Reset password
        </Button>

        <div className="mt-7 text-center">
          <p
            className="cursor-pointer text-cc-content-main/80 transition duration-200 hover:text-cc-content-main hover:underline"
            onClick={() => setShowForgotPasswordForm(false)}
          >
            Go back
          </p>
        </div>
      </div>
    </>
  );
}
