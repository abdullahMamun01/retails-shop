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

  ...authConfig,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          provider: account.provider,
          accessToken: account?.access_token,
          accessTokenExpires: Date.now() + account?.expires_in * 1000,
          refreshToken: account?.refresh_token,
          user,
        };
      }

      if (
        Date.now() > token?.accessTokenExpires && token.provider === "google") {
          
        return refreshAccessToken(token);
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token?.user;
      session.accessToken = token?.access_token;
      session.error = token?.error;
      return session;
    },
  },
});

async function refreshAccessToken(token) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens?.access_token,
      accessTokenExpires: Date.now() + refreshedTokens?.expires_in * 1000,
      refreshToken: refreshedTokens?.refresh_token,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
