import NextAuth from "next-auth";

import mongoClientPromise from "./database/mongoClientPromise";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: MongoDBAdapter(mongoClientPromise, {
    databaseName: process.env.DATABASENAME,
  }),
  session: {
    strategy: "jwt",
  },

  // jwt: {
  //   secret: process.env.ACCESS_TOKEN_SECRET,
  //   encryption: true,
  // },

  ...authConfig ,
  callbacks: {
    async jwt({ token, user, account }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;

      return session;
    },
  },
});

// async function refreshAccessToken(token) {
//   try {
//     const res = await fetch("http://localhost:3000/api/auth/refresh", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         refreshToken: token.refreshToken,
//       }),
//     });

//     const refreshedTokens = await res.json();

//     if (!res.ok) {
//       throw refreshedTokens;
//     }

//     return {
//       ...token,
//       accessToken: refreshedTokens.accessToken,
//       accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000,
//       refreshToken: refreshedTokens.refreshToken ?? token.refreshToken, // Fall back to old refresh token
//     };
//   } catch (error) {
//     console.error("Error refreshing access token", error);

//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }

// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import mongoClientPromise from "./database/mongoClientPromise";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";

// export const {
//   handlers: { GET, POST },
//   signIn,
//   signOut,
//   auth,
// } = NextAuth({
//   adapter : MongoDBAdapter(mongoClientPromise())
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",

//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {

//         const res = await fetch("http://localhost:3000/api/auth/login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: credentials?.email,
//             password: credentials?.password,
//           }),
//         });
//         const user = await res.json();

//         if (user) {

//           return user;
//         } else {

//           return null;

//         }
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token,  user }) {
//       console.log(token)
//       return { ...token, ...user };
//     },
//     async session({ session, token, user }) {

//       session.user = token;

//       return session;
//     },
//   },
// });
