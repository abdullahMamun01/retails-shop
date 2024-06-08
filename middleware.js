import NextAuth from "next-auth";
import { authConfig } from "./auth.config";


const publicRoutes = [
  '/login',
  '/register',
  '/shop' ,
  '/auth/callback/google',
  '/api/auth'
]
;
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticate = !!req.auth;
  console.log({isAuthenticate})

  const isPublic =
    publicRoutes.find((route) => nextUrl.pathname.startsWith(route)) ||
    nextUrl.pathname === "/";
  

  if (!isAuthenticate && !isPublic)
    return Response.redirect(new URL("/login", nextUrl));
  
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
