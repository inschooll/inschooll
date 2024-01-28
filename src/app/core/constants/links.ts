const login = "/login";
const signup = "/signup";
const resetPassword = "/reset-password";
// const completeRegistration = "/complete-registration";
const landingPage = '/';
const purpose = '/purpose';
const pickSchool = '/pick-university';
const createSchool = '/create-school';
const dashboard = "/dashboard";
const school = "/school";
const backOffice = "/back-office";
const studentAffairs = "/student-affairs";
const sdc = "/student-affairs/sdc";
const src = "/student-affairs/src";
const cases = "/student-affairs/sdc/cases";
const caseWithId = (id: string) => `/student-affairs/sdc/cases/${id}`;

export default {
  login,
  signup,
  resetPassword,
  landingPage,
  purpose,
  pickSchool,
  createSchool,
  dashboard,
  school,
  backOffice,
  studentAffairs,
  sdc,
  src,
  cases,
  caseWithId,
} as const;