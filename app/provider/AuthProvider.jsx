
'use client'
import { Spinner } from "@/components/ui/Spinner";
import { SessionProvider } from "next-auth/react";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";

function Auth({ children }) {
  const { status } = useSession();

  if (status === "loading") {
    return <div className="min-h-screen flex justify-center items-center"><Spinner size="large"/></div>;
  }

  return children;
}

export default function AuthProvider({ children }) {
  return (

    <SessionProvider>
      <Auth>{children}</Auth>
    </SessionProvider>
  );  
}