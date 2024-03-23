"use client";
import { Check } from "lucide-react";
import React from "react";
import { OnboardingButton, OnboardingTitleAndDescription } from "../page";
import Link from "next/link";
import links from "~/lib/constants/links";
import OnboardingCard from "./onboarding-card";

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
      <OnboardingTitleAndDescription
        title="School creation benefits"
        description="Inschooll literally gives your school super powers."
      />
      <OnboardingCard>
        <div className="divide-y divide-cc-border">
          {benefits.map((text, i) => (
            <BenefitTile key={i}>{text}</BenefitTile>
          ))}
        </div>
      </OnboardingCard>

      <Link href={links.createSchool}>
        <OnboardingButton title="Create school" />
      </Link>
    </>
  );
}

const BenefitTile = ({ children }: { children: React.ReactNode | string }) => {
  return (
    <div className="flex items-center gap-10 py-6">
      <Check className="shrink-0 text-cc-green" size={20} />
      <p className="text-cc-content/70">{children}</p>
    </div>
  );
};
