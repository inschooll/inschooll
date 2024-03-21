"use client";
import { Check } from "lucide-react";
import React from "react";
import {
  OnboardingButton,
  OnboardingTitleAndDescription
} from "../page";
import Link from "next/link";
import links from "~/lib/constants/links";

/**
 * This component displays a container with texts outlining 
 * the benefits of creating a school
 * @returns 
 */
export default function SchoolBenefits() {
  const benefits: string | React.ReactNode[] = [
    "Inschooll facilitates the management of academic activities between students and lecturers.",
    "Empowers faculties and departments with a suite of powerful tools that help improve organization, record-keeping, and more.",
    <p key={2}>
      Freely awards administrators with{" "}
      <span className="font-semibold">unprecedented capabilities.</span>
    </p>,
  ];

  return (
    <>
      <div className="space-y-8 text-center">
        <OnboardingTitleAndDescription
          title="School creation benefits"
          description="Inschooll literally gives your school super powers."
        />
        <div className="px-7 py-5 rounded-lg max-w-xl text-left divide-y divide-cc-border app-box-shadow">
          {benefits.map((text, i) => (
            <div className="py-6 flex gap-10 items-center" key={i}>
              <Check className="text-cc-green shrink-0" size={20} />
              <p className="text-cc-content/70">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <Link href={links.createSchool}>
        <OnboardingButton title="Create school" />
      </Link>
    </>
  );
}
