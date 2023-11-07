'use client';
import React, { type FormEvent, useState } from "react";
import AuthLayout from "../layout";
import LabelAndTextInputField from "~/app/_components/inputs/label_text_input_field";
import Button from "~/app/_components/buttons/button";

const Login = () => {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("login form!");
  }
  const [selectedNavItem, setSelectedNavItem] = useState(1);

  return (
    <>
          {/* Navbar */}
          <div className="grid grid-cols-3">
            <NavItem onClick={() => setSelectedNavItem(1)} isSelected={selectedNavItem == 1} >Email</NavItem>
            <NavItem onClick={() => setSelectedNavItem(2)} isSelected={selectedNavItem == 2} >Phone</NavItem>
            <NavItem onClick={() => setSelectedNavItem(3)} isSelected={selectedNavItem == 3} >Matric No</NavItem>
          </div>

          {/* Line break */}
          <div className="w-full h-[1px] bg-cc-content-main/20"></div>

          {/* Form */}
          <div className="mt-5">
            <form onSubmit={onSubmit}>
              <LabelAndTextInputField
                label={selectedNavItem == 1 ? "email" : selectedNavItem == 2 ? 'phone' : 'matric no'}
                name="email"
                placeholder={`Enter your ${selectedNavItem == 1 ? 'email address' : selectedNavItem == 2 ? 'phone number' : 'matric number'}...`}
              />
              <div className="mt-3">
                <LabelAndTextInputField
                  label="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password..."
                />
              </div>

              <div className="mt-5">
                <Button variant={"defaultFull"} size={"md"} type="submit">
                  Log in
                </Button>
              </div>
            </form>
          </div>

    </>
  );
};

export default Login;

const NavItem = ({
  children,
  isSelected,
  onClick
}: {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: React.MouseEventHandler;
}) => {
  return (
    <button className="flex justify-center items-center pt-3 mt-3 pb-3 md:hover:bg-cc-content-main/10 rounded-t-md" onClick={onClick}>
      <div className={isSelected ? "font-semibold" : "text-cc-content-main/20 text-sm"}>{children}</div>
    </button>
  );
};
