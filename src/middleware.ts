import { NextResponse, type NextRequest } from 'next/server';
import constants from './lib/constants/constants';
import { verifyJWT } from './lib/auth';
import links from './lib/constants/links';

export async function middleware(req: NextRequest) {
  // FIXME: Remove the return so middleware can always run
  return;
  const route = req.nextUrl.pathname;
  const publicRoutes: string[] = [links.landingPage, links.login, links.signup, links.resetPassword];  // home, login, signup, reset password
  // check if route this request is trying to visit is towards a public route
  const isPublicRoute = publicRoutes.includes(route);
  
  // grab cookies
  const authToken = req.cookies.get(constants.tokenName)?.value;

  // verify jwt. TODO: test the result when theres not token
  const payload = await verifyJWT(authToken!).catch((err) => console.log(err));
  
  console.log('🎯route:', route);
  console.log('🦴payload:', payload);

  // uf a user visits a public route without being authenticated
  if (isPublicRoute && !payload) return;

  // TODO: if user is authenticated and visits a public route, we should 
  // redirect them to a page where we can ask them which school they belong 
  // (out of all the school's they have a role in) to, but if they happen to not 
  // belong to any school then we must redirect them to the purpose screen
  if (isPublicRoute && payload) {
    // Get roles. if any redirect request to a page that aks to know which school 
    // the user would like to access, 
    // and if no roles for the user was found, redirect the user to the purpose screen 
    return NextResponse.redirect(new URL(links.purpose, req.url));
  }

  // if unauthorized
  if (!isPublicRoute && !payload) {
    return NextResponse.redirect(new URL(links.login, req.url));
  }
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|images|icons|logo|lottie|favicon.ico).*)',
};