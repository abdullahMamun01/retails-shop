
'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

import { LogOut } from 'lucide-react'
import Image from 'next/image'

export default function Logout() {
    const { data: session } = useSession()
    useEffect(() => {
        if (session?.error === 'RefreshAccessTokenError') {
            signIn()
        }
    }, [session])

    const handleLogout = () => {
        signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/login` })
    }


    return (
        <button onClick={handleLogout} className="w-[100px] text-gray-200 flex">
            <div>
                {
                    session?.user?.image ? 
                    <Image src={session?.user?.image} width={100} height={100} className='w-8 h-8 rounded-full mr-2 my-auto' alt='user' />
                    :
                    <span className='w-15 h-8 rounded-full mr-2 my-auto bg-gray-300 text-gray-500 p-2'>
                        {session?.user?.name[0]}
                    </span>
                }
            </div>
            |
            <LogOut className='mx-auto' />
        </button>
    )
}
