import Image from "next/image";
import AvatarUsername from "~/components/avatar-username";
import InfoBox from "~/components/cards/InfoBox";
import { Button } from "~/components/ui/button";
import images from "~/lib/constants/images";
import OnboardingCard from "../../_components/onboarding-card";
import { OnboardingButton, OnboardingTitleAndDescription } from "../../page";
import BuildingSetup from "./building-setup";
import ClassOfHonorSetup from "./class-of-honour-setup";
import DegreeSetup from "./degree-setup";
import DepartmentSetup from "./department-setup";
import FacultySetup from "./faculty-setup";
import GradePointSetup from "./grade-point-and-description-setup";
import GradingSystemSetup from "./grading-system-setup";
import IDNumberSetup from "./id-number-setup";
import OfficeSetup from "./office-setup";
import SemesterSetup from "./semester-setup";

type TSetup = { title: string; description: string; component: JSX.Element };
const setupList: TSetup[] = [
  {title: "Semesters", description: "Academic sessions per year.", component: <SemesterSetup />},
  {title: "Faculties", description: "The faculties within the school.", component: <FacultySetup />},
  {title: "Departments", description: "The departments within the school. ", component: <DepartmentSetup />},
  {title: "Degree", description: "Degrees supported by the school.", component: <DegreeSetup />},
  {title: "Offices", description: "The current offices within the school.", component: <OfficeSetup />},
  {title: "Buildings", description: "The buildings within the school.", component: <BuildingSetup />},
  {title: "Grading system", description: "The method for performance evaluation in courses. ", component: <GradingSystemSetup />},
  {title: "Grade points", description: "An important number used in calculating GPA and CGPA.", component: <GradePointSetup />},
  {title: "Class of honor", description: "First class, second class, third class etc.", component: <ClassOfHonorSetup />},
  {title: "Id number", description: "Unique numbers used for identifying individuals in schools.", component: <IDNumberSetup />},
];

export default function Summary() {
  const onSubmit = () => {
    console.log("Done screen!");
  };

  return (
    <>
      <OnboardingTitleAndDescription
        title="Summary"
        description="Confirm that the school information provided so far is accurate."
      />
      <OnboardingCard className="w-full space-y-3 divide-y divide-cc-border md:w-[40rem]">
        <div className="flex items-center justify-between pb-2">
          <SummaryTitleAndDescription
            title="School"
            description="The created school."
          />
          <Button variant={"secondary"} className="flex items-center gap-2">
            <AvatarWithBlur logoUrl={images.logos.bingham} />
            <p className="font-medium">Bingham university</p>
          </Button>
        </div>
        {/* Chancellor */}
        <div className="flex items-center justify-between pb-2 pt-4">
          <SummaryTitleAndDescription
            title="Chancellor"
            description="The chancellor of this school can be changed later."
          />
          <Button variant={"secondary"} className="flex items-center gap-2">
            <AvatarUsername imgUrl={images.random1} text="Chukwu daniel" />
          </Button>
        </div>
        {/* Others */}
        {setupList.map((setup, i) => (
          <SummarySetupCard key={i} setup={setup} />
        ))}

        <InfoBox text="The options you’ve selected and configured so far can later on be modified and expanded upon. So worry not 🤧, you’ll always be able to expand on what your school does and how it does what it does 😉" />
      </OnboardingCard>

      <OnboardingButton title="Complete school setup" onClick={onSubmit} variant={"tertiary"} />
    </>
  );
}

const SummarySetupCard = ({ setup }: { setup: TSetup }) => {
  return (
    <div className="flex items-center justify-between pb-2 pt-4">
      <SummaryTitleAndDescription
        title={setup.title}
        description={setup.description}
      />
      <div className="">
        <Button variant={"secondary"}>Edit</Button>
      </div>
    </div>
  );
};

const AvatarWithBlur = ({ logoUrl }: { logoUrl: string }) => {
  return (
    <div className="relative flex size-6 items-center justify-center overflow-hidden rounded-full">
      <Image
        src={logoUrl}
        alt="School logo"
        width={30}
        height={30}
        className="absolute left-0 top-0 h-full w-full object-cover"
      />
      <div className="flex h-full w-full items-center justify-center bg-cc-background/30 backdrop-blur-lg">
        <div className="size-3">
          <Image
            src={logoUrl}
            alt="School logo"
            width={50}
            height={50}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const SummaryTitleAndDescription = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="">
      <p className="font-semibold text-cc-content/80">{title}</p>
      <p className="text-cc-content/70">{description}</p>
    </div>
  );
};
