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
const schoolAbout = "/school/about";
const backoffice = {
  main: '/back-office',
  general: '/back-office/general',
  campus: '/back-office/campus',
  faculties: {
    main: '/back-office/faculties',
    create: '/back-office/faculties/create',
  },
  departments: '/back-office/departments',
  courses: '/back-office/courses',
  members: '/back-office/members',
  fees: '/back-office/fees',
};
const studentAffairs = "/student-affairs";
const sdc = "/student-affairs/sdc";
const src = "/student-affairs/src";
const cases = "/student-affairs/sdc/cases";
const casesClosed = "/student-affairs/sdc/cases/closed";
const caseWithId = (id: string) => `/student-affairs/sdc/cases/${id}`;
const caseWithIdComments = (id: string) => `/student-affairs/sdc/cases/${id}/comments`;
const caseWithIdVerdict = (id: string) => `/student-affairs/sdc/cases/${id}/verdict`;

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
  schoolAbout,
  backoffice,
  studentAffairs,
  sdc,
  src,
  cases,
  casesClosed,
  caseWithId,
  caseWithIdComments,
  caseWithIdVerdict,
} as const;