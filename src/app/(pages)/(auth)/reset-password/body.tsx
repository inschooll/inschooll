"use client";
import React, { type ChangeEvent, useState } from "react";
import LabelAndTextInputField from "~/components/inputs/label_text_input_field";
import Button from "~/components/buttons/button";
import { getErrorMessage } from "~/core/utils-client";
import { api } from "~/trpc/react";
import errorMessages from "~/app/core/constants/error-messages";
import links from "~/app/core/constants/links";
import successMessages from "~/app/core/constants/success-messages";
import InfoBox from "~/components/cards/InfoBox";

export default function ResetPasswordForm(props: { userId: string }) {
  // store
  // const { addPopup } = usePopUpStore();
  // const { handleError } = useHandleError();
  // fields
  const [input, setInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | React.ReactNode>("")
  const { mutate: resetPassword, isLoading } = api.password.resetPassword.useMutation({
    onError: (err) => {
      const message = getErrorMessage(err.message);
      setInputErrorMessage(message);
    },
    onSuccess: ({email}) => {
      const msg = (
        <p>
          {successMessages.passwordChanged} <a href={links.login + `?email=${email}`} className="text-white font-semibold underline">Login</a>
        </p>
      );
      setSuccessMsg(msg);
    }
  });

  const formIsValid = () => {
    setInputErrorMessage("");

    // ensure password
    if (!input.newPassword) {
      return setInputErrorMessage(errorMessages.passwordRequired);
    }
    
    if (input.newPassword !== input.confirmPassword) {
      return setInputErrorMessage(errorMessages.passwordNewAndConfirmNoMatch);
    }

    return true;
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((data) => ({ ...data, [name]: value }));
  };

  return (
    <>
      <div className="mt-5">
        <form>
          {inputErrorMessage ? <InfoBox text={inputErrorMessage} type="error" /> : <></>}
          {successMsg ? <InfoBox text={successMsg} type="success" /> : <></>}

          <div className="flex flex-col gap-2">
            {/* new password */}
            <LabelAndTextInputField
              label="New password"
              name="newPassword"
              type="password"
              placeholder="Enter new password"
              onChange={onChange}
            />
            {/* password */}
            <LabelAndTextInputField
              label="Confirm password"
              name="confirmPassword"
              type="text"
              placeholder="Re-enter new password"
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

                resetPassword({ password: input.newPassword, userId: props.userId });
              }}
            >
              Reset password
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
