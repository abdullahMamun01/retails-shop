import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const publicRoutes = [
  '/en/login',
  '/en/register',
  '/en/shop' ,
  '/api/auth/callback/google',
  '/'
  
]
;
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticate = !!req.auth;
 

  const isPublic =
    publicRoutes.find((route) => nextUrl.pathname.startsWith(route)) ||
    nextUrl.pathname === "/";
  

  if (!isAuthenticate && !isPublic)
    return Response.redirect(new URL("/en/login", nextUrl));

  else NextResponse.next()
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
