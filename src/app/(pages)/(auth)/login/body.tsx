"use client";
import { useState } from "react";
import { isEmail } from "validator";
import errorMessages from "~/app/core/constants/error-messages";
import successMessages from "~/app/core/constants/success-messages";
import Button from "~/components/buttons/button";
import InfoBox from "~/components/cards/InfoBox";
import Input from "~/components/inputs/input";
import { usePopUpStore } from "~/components/popups/popup_store";
import { getErrorMessage } from "~/core/utils-client";
import { api } from "~/trpc/react";
// import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { LoginSchema, type TLoginSchema } from "~/lib/types";

type LoginFormBodyProps = {
  updateAuthToken: (token: string) => void;
  defaultEmail?: string;
}

export default function LoginFormBody(props: LoginFormBodyProps) {
  // store
  const { addPopup } = usePopUpStore();
  const methods = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema)
  });
  
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("")
  const { mutate: login, isLoading } = api.auth.login.useMutation({
    onError: (err) => {
      const message = getErrorMessage(err.message);
      setInputErrorMessage(message);
    },
    onSuccess: ({ authToken }) => {
      addPopup({
        text: successMessages.loginSuccessful,
        type: "success",
      });
      setSuccessMsg(successMessages.loginSuccessful);
      props.updateAuthToken(authToken);
    },
  });

  if (showForgotPasswordForm){
    return (
      <ForgotPasswordForm
        setShowForgotPasswordForm={setShowForgotPasswordForm}
      />
    );
  }

  const onSubmit = (data: TLoginSchema) => {
    let [username, email] = ["", ""];
    if (isEmail(data.emailOrUsername))
      email = data.emailOrUsername;
    else username = data.emailOrUsername;

    login({ username, email, password: data.password });
  }

  return (
    <div className="mt-5">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {inputErrorMessage ? <InfoBox text={inputErrorMessage} type="error" /> : <></>}
          {successMsg ? <InfoBox text={successMsg} type="success" /> : <></>}

          <div className="flex flex-col gap-2">
            {/* email or username */}
            <Input
              label="Email or Username"
              name="emailOrUsername"
              type="text"
              required
              placeholder="Enter email or password"
            />
            {/* password */}
            <Input
              label="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password..."
            />
          </div>

          <div className="mt-7">
            <Button
              variant={"defaultFull"}
              size={"md"}
              type="submit"
              isLoading={isLoading}
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
  const [successMsg, setSuccessMsg] = useState("")
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const { mutate: forgotPassword, isLoading } = 
    api.password.sendResetPasswordLinkToEmail.useMutation({
      onError: (err) => {
        const message = getErrorMessage(err.message);
        setInputErrorMessage(message);
      },
      onSuccess: () => {
        setSuccessMsg(successMessages.resetPasswordEmailSent);
      }
    });

  return (
    <>
      <form>
        {inputErrorMessage ? <InfoBox text={inputErrorMessage} type="error" /> : <></>}
        {successMsg ? <InfoBox text={successMsg} type="success" /> : <></>}

        {/* email or username */}
        <Input
          label="Email"
          name="email"
          type="text"
          placeholder="Enter email address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </form>

      <div className="mt-7">
        <Button
          variant={"defaultFull"}
          size={"md"}
          type="button"
          isLoading={isLoading}
          onClick={() => {
            if (!email) return;
            if (!isEmail(email)){
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
