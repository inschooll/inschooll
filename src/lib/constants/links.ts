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
  campus: {
    main: '/back-office/campus',
    create: '/back-office/campus/create',
  },
  faculties: {
    main: '/back-office/faculties',
    create: '/back-office/faculties/create',
  },
  departments: {
    main: '/back-office/departments',
    create: '/back-office/departments/create',
  },
  courses: {
    main: '/back-office/courses',
    create: '/back-office/courses/create',
  },
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