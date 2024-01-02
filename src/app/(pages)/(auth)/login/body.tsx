"use client";
import React, { type ChangeEvent, useState } from "react";
import LabelAndTextInputField from "~/app/_components/inputs/label_text_input_field";
import Button from "~/app/_components/buttons/button";
import { getErrorMessage } from "~/core/utils-client";
import { api } from "~/trpc/react";
import validator from "validator";
import { usePopUpStore } from "~/app/_components/popups/popup_store";
import errorMessages from "~/app/core/constants/error-messages";
import InfoBox from "~/app/_components/cards/InfoBox";
import successMessages from "~/app/core/constants/success-messages";
// import { useRouter } from "next/navigation";

export default function LoginFormBody(props: {
  updateAuthToken: (token: string) => void;
  defaultEmail?: string;
}) {
  // store
  const { addPopup } = usePopUpStore();
  // fields
  const [input, setInput] = useState({
    emailOrUsername: props.defaultEmail ?? "",
    password: "",
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

  const formIsValid = () => {
    setInputErrorMessage("");

    // email or username
    if (!input.emailOrUsername)
      return setInputErrorMessage("Please enter a valid email or username");

    // password
    if (!input.password)
      return setInputErrorMessage("Please enter a valid password");

    return true;
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((data) => ({ ...data, [name]: value }));
  };

  if (showForgotPasswordForm)
    return (
      <ForgotPasswordForm
        setShowForgotPasswordForm={setShowForgotPasswordForm}
      />
    );

  return (
    <div className="mt-5">
      <form>
        {inputErrorMessage ? <InfoBox text={inputErrorMessage} type="error" /> : <></>}
        {successMsg ? <InfoBox text={successMsg} type="success" /> : <></>}

        <div className="flex flex-col gap-2">
          {/* email or username */}
          <LabelAndTextInputField
            label="Email or Username"
            name="emailOrUsername"
            type="text"
            placeholder="Enter email or password"
            value={input.emailOrUsername}
            onChange={onChange}
          />
          {/* password */}
          <LabelAndTextInputField
            label="password"
            name="password"
            type="password"
            placeholder="Enter your password..."
            value={input.password}
            onChange={onChange}
          />
        </div>

        <div className="mt-7">
          <Button
            variant={"defaultFull"}
            size={"md"}
            type="button"
            isLoading={isLoading}
            onClick={() => {
              if (!formIsValid()) return;

              let [username, email] = ["", ""];
              if (validator.isEmail(input.emailOrUsername))
                email = input.emailOrUsername;
              else username = input.emailOrUsername;

              login({ username, email, password: input.password });
            }}
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
        <LabelAndTextInputField
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
            if (!validator.isEmail(email)){
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
