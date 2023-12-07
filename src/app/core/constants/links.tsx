const toLinkFormat = (v: string) => v.split(' ').join('-'); // nile university -> nile-university

const login = "/login";
const signup = "/signup";
const completeRegistration = "/complete-registration";
const landingPage = '/';
const purpose = '/purpose';
const pickSchool = '/pick-university';
const createSchool = '/create-school';
const dashboard = (schoolName: string) => `/${toLinkFormat(schoolName)}/dashboard`;
const school = (schoolName: string) => `/${toLinkFormat(schoolName)}/school`;
const studentAffairs = (schoolName: string) => `/${toLinkFormat(schoolName)}/student-affairs`;
const sdc = (schoolName: string) => `/${toLinkFormat(schoolName)}/student-affairs/sdc`;
const src = (schoolName: string) => `/${toLinkFormat(schoolName)}/student-affairs/src`;
const cases = (schoolName: string) => `/${toLinkFormat(schoolName)}/student-affairs/sdc/cases`;

export default {
  login,
  signup,
  landingPage,
  purpose,
  pickSchool,
  completeRegistration,
  createSchool,
  dashboard,
  school,
  studentAffairs,
  sdc,
  src,
  cases
} as const;