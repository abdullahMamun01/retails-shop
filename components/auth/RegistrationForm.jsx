'use client'

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegistrationForm() {
    const router = useRouter();
    const onSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const name = formData.get('name')
        const email = formData.get('email')
        const password = formData.get('password');
        const confirmPass = formData.get('confirm')

        if (password != confirmPass) {
            return
        }
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

            if(res.ok){
                router.push('/login')
                toast.success("Registration has completed")
            }

        } catch (e) {

        }

    }
    return (
        <form onSubmit={onSubmit} >
            <div className="space-y-2">
                <div>
                    <label htmlFor="name" className="text-gray-600 mb-2 block">Full Name</label>
                    <input type="text" name="name" id="name"
                        className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-s m rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                        placeholder="fulan fulana" />
                </div>
                <div>
                    <label htmlFor="email" className="text-gray-600 mb-2 block">Email address</label>
                    <input type="email" name="email" id="email"
                        className="block w-full border border-gray-300 px-4 py-3 text-gray-600 tex t-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                        placeholder="youremail.@domain.com" />
                </div>
                <div>
                    <label htmlFor="password" className="text-gray-600 mb-2 block">Password</label>
                    <input type="password" name="password" id="password"
                        className="block w-full border border-gray-300 px-4 py-3 text-gra y-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                        placeholder="*******" />
                </div>
                <div>
                    <label htmlFor="confirm" className="text-gray-600 mb-2 block">Confirm password</label>
                    <input type="password" name="confirm" id="confirm"
                        className="block w-full border border-gray-300 px-4 py-3 text-gray- 600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                        placeholder="*******" />
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
    )
}
