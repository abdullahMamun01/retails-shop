'use client'
import { signIn } from "next-auth/react";

export default function GoogleLogin() {
    const handleAuth = () => {  
      signIn('google' , {callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/shop`})
    }
    return (
          <button onClick={handleAuth}  className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500">
            google
        </button>

    )
}
