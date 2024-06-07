'use client'
import { login } from '@/app/actions'
import { signIn, useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

import React from 'react'
import toast from 'react-hot-toast'

export default function LoginForm() {
    const session = useSession()
    console.log(session.status, ' login')
    const router = useRouter()
    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const response = await login(formData);
        console.log(response);
        if (!!response.error) {
            toast.error('failed to login')
        } else {
            toast.success('login success')
            router.push('/shop')
            router.refresh()
            

        }

    }

    return (
        <form onSubmit={onSubmit}>
            <div className="space-y-2">
                <div>
                    <label htmlFor="email" className="text-gray-600 mb-2 block">Email address</label>
                    <input type="email" name="email" id="email"
                        className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                        placeholder="youremail.@domain.com" />
                </div>
                <div>
                    <label htmlFor="password" className="text-gray-600 mb-2 block">Password</label>
                    <input type="password" name="password" id="password"
                        className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                        placeholder="*******" />
                </div>
            </div>
            <div className="flex items-center justify-between mt-6">
                <div className="flex items-center">
                    <input type="checkbox" name="remember" id="remember"
                        className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                    <label htmlFor="remember" className="text-gray-600 ml-3 cursor-pointer">Remember me</label>
                </div>
                <a href="#" className="text-primary">Forgot password</a>
            </div>
            <div className="mt-4">
                <button type="submit"

                    className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">Login</button>
            </div>
        </form>
    )
}
