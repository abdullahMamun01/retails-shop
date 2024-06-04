
'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

export default function Logout() {
    // const {data:session} = useSession()

    // useEffect(() => {
    //     if(data?.error === 'RefreshAccessTokenError'){
    //         signIn()
    //     }
    // }, [session])

    const handleLogout = () => {
        signOut({callbackUrl: "http://localhost:3000/login"})
    }


    return (
        <button onClick={handleLogout} className="w-[100px]  py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500">
            logout
        </button>
    )
}
