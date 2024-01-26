const favicon = "favicon.png";
const logo = "/logo/logo.svg";
const logoFull = "/logo/logo-full.svg";
const brainPink = "/logo/brain-pink.svg";
const bookStack = "/logo/book-stack.svg";
const mathsCalculations = "/images/maths-calculations.svg";
const mathsCalculation = "/images/maths-calculation.svg";
const doubleArrowUp = "/icons/double-arrow-up.svg";
const menu = "/icons/menu.svg";
const cancel = "/icons/cancel.svg";
const googleLogo = "/icons/google-logo.svg";
const nigeriaFlag = "/icons/countries/nigeria.svg";
const downArrow = "/icons/down-arrow.svg";
const schoolLogo = "/images/schools/bingham.png";
const maleAvatarDefault = "/icons/male-avatar-default.svg";
const femaleAvatarDefault = "/icons/female-avatar-default.svg";
const countryFlag = (name: string) =>  // e.g "United States" -> '/icons/country-flags/united-states.svg'
  `/icons/country-flags/${name.toLowerCase().replace(" ", "-")}.svg`;

// lottie
const spinner = "/images/lottie/spinner.json";

const random1 = "/images/random-1.jpg";

export default {
  favicon,
  logo,
  logoFull,
  brainPink,
  bookStack,
  mathsCalculations,
  mathsCalculation,
  doubleArrowUp,
  menu,
  cancel,
  googleLogo,
  nigeriaFlag,
  downArrow,
  schoolLogo,
  random1,
  spinner,
  countryFlag,
  maleAvatarDefault,
  femaleAvatarDefault,
} as const;
