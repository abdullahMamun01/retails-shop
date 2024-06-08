'use client'

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import InputControl from "../form/InputControl";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/utils/validation";

export default function RegistrationForm() {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName : "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = async (formData) => {
        const {fullName: name,email , password} = formData
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    email,
                    password,
                }),
            });

            if (res.ok) {
                router.push('/login')
                toast.success("Registration has completed")
            }

        } catch (e) {

        }

    }
    return (
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <div className="space-y-2">
                    <div>
                        <InputControl
                            name="fullName"
                            label="fullName"
                            placeholder="enter your fullName"
                            // description="password is required! "
                            inputType="text"
                            formControl={form.control}
                        />
                    </div>
                    <div>
                        <InputControl
                            name="email"
                            label="email"
                            placeholder="enter your email"
                            // description="password is required! "
                            inputType="email"
                            formControl={form.control}
                        />
                    </div>
                    <div>
                        <InputControl
                            name="password"
                            label="password"
                            placeholder="enter your password"
                            // description="password is required! "
                            inputType="password"
                            formControl={form.control}
                        />
                    </div>
                    <div>
                        <InputControl
                            name="confirmPassword"
                            label="Confirm password"
                            placeholder="enter your password"
                            // description="password is required! "
                            inputType="password"
                            formControl={form.control}
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex items-center">
                        <input type="checkbox" name="aggrement" id="aggrement"
                            className="text-primary focus:ring-0 rounded-sm cursor-pointer" required />

                        <label htmlFor="aggrement" className="text-gray-600 ml-3 cursor-pointer">I have read and agree to the <a
                            href="#" className="text-primary">terms & conditions</a></label>
                    </div>
                </div>
                <div className="mt-4">
                    <button type="submit"
                        className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">create
                        account</button>
                </div>
            </form>
        </Form>
    )
}
