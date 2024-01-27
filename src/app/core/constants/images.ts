const favicon = "favicon.png";
const logoFull = "/logo/logo-full.svg";
const brainPink = "/logo/brain-pink.svg";
const bookStack = "/logo/book-stack.svg";
const mathsCalculations = "/images/maths-calculations.svg";
const mathsCalculation = "/images/maths-calculation.svg";
const doubleArrowUp = "/icons/double-arrow-up.svg";
const menu = "/icons/menu.svg";
const cancel = "/icons/cancel.svg";
const nigeriaFlag = "/icons/countries/nigeria.svg";
const downArrow = "/icons/down-arrow.svg";
const maleAvatarDefault = "/icons/male-avatar-default.svg";
const femaleAvatarDefault = "/icons/female-avatar-default.svg";
const countryFlag = (name: string) =>  // e.g "United States" -> '/icons/country-flags/united-states.svg'
  `/icons/country-flags/${name.toLowerCase().replace(" ", "-")}.svg`;

// lottie
const spinner = "/images/lottie/spinner.json";

const random1 = "/images/random-1.jpg";

// school
const school = {
  harvard: {
    cover: "/images/school/harvard/harvard-cover.jpg",
    night: "/images/school/harvard/harvard-1.webp",
    day: "/images/school/harvard/harvard-2.webp",
    conferenceRoom: "/images/school/harvard/harvard-3.jpg",
    classroom: "/images/school/harvard/harvard-classroom.jpg",
    faculty: "/images/school/harvard/harvard.webp",
  }
}

const logos = {
  inschool: "/logo/logo.svg",
  bingham: "/logo/school/bingham.png",
  googleLogo: "/icons/google-logo.svg",
}

export default {
  favicon,
  logos,
  logoFull,
  brainPink,
  bookStack,
  mathsCalculations,
  mathsCalculation,
  doubleArrowUp,
  menu,
  cancel,
  nigeriaFlag,
  downArrow,
  random1,
  spinner,
  countryFlag,
  maleAvatarDefault,
  femaleAvatarDefault,

  school,
} as const;
