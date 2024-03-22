export type monthsType = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

const constants = {
  appName: "Inschooll",
  // appLogo: "https://utfs.io/f/ecb463d0-4e19-4bc4-83fa-f05fb2325369-veo7dd.svg",
  appLogo: "https://utfs.io/f/79739ac0-4aa3-44e2-b126-32fbfae5c379-1zbfv.png",
  educationLevels: ["Primary", "Secondary", "Tertiary"],
  schoolTypes: ["Public", "Private"],
  tokenName: "auth-token",
  theme: {dark: 'dark', light: 'light', system: 'system'} as const,
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ] as const,
  daysInMonth: {
    January: 31,
    February: (new Date().getFullYear() % 4) === 0 ? 29 : 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  },
  gender: ["male", "female"],
  dropdown: {},
};

export default constants;
