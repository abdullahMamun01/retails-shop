



'use client'
import { login } from '@/app/actions'
import { loginSchema } from '@/utils/validation'
import { signIn, useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

import React from 'react'
import toast from 'react-hot-toast'
import { Form } from '../ui/form'
import InputControl from '../form/InputControl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export default function LoginForm() {
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })


    const onSubmit = async (formData) => {

       try {
        const response = await login(formData);

        if (!!response.error) {
            toast.error('failed to login')
        } else {
            toast.success('login success')
            router.push('/shop')
            router.refresh()


        }
       } catch (error) {
        console.log(error)
        toast.error(error)
       }

    }

    return (
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <InputControl
                        name="email"
                        label="email"
                        placeholder="enter your email"
                        description="email is required! "
                        inputType="email"
                        formControl={form.control}
                    />

                    <InputControl
                        name="password"
                        label="password"
                        placeholder="enter your password"
                        description="password is required! "
                        inputType="password"
                        formControl={form.control}
                    />

                    {/* <div>
                        <label htmlFor="email" className="text-gray-600 mb-2 block">Email address</label>
                        <input type="email" name="email" id="email"
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            placeholder="youremail.@domain.com" />
                    </div> */}
                    {/* <div>
                        <label htmlFor="password" className="text-gray-600 mb-2 block">Password</label>
                        <input type="password" name="password" id="password"
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            placeholder="*******" />
                    </div> */}
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
        </Form>
    )
}
