import LoginForm from "@/components/auth/LoginForm";
import FacebookLogin from "@/components/auth/FacebookLogin";
import GoogleLogin from "@/components/auth/GoogleLogin";
import Link from "next/link";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth()

  if(session?.user?.name){
    redirect('/shop')
    
  }


  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
        <p className="text-gray-600 mb-6 text-sm">welcome back customer</p>
            <LoginForm/>
        <div className="mt-6 flex justify-center relative">
          <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
            Or login with
          </div>
          <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
        </div>
        <div className="mt-4 flex gap-4">
          <FacebookLogin/>
            <GoogleLogin />
        </div>

        <p className="mt-4 text-center text-gray-600">
          Do not have account? {' '}
          <Link href="/register" className="text-primary">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
