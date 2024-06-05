"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import { useCart } from '@/hooks/useCart';
import { useFormStatus } from "react-dom";
import {
    Form
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputControl from './InputControl';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

const formSchema = z.object({
    firstName: z.string().nonempty().min(3, 'Must be at least 3 characters long'),
    lastName: z.string().nonempty().min(3, 'Must be at least 3 characters long'),
    company: z.string().optional(),
    region: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email('Invalid email format'),

});

const initialState = {
    firstName: '',
    lastName: '',
    company: '',
    region: '',
    address: '',
    city: '',
    phone: '',
    email: ''
}

function PlaceOrderForm() {
    const session = useSession()
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialState
    })

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await fetch(`/api/user/profile/${session.data.user.id}`);
                const data = await response.json();
                if (!response.ok) {
                    throw Error('User request failed')
                }
                if (data) {
                    const shipping = data.shipping

                    form.reset({
                        address: shipping.streetAddress,
                        city: shipping.city,
                        phone: shipping.phone,
                        email: data.email
                    });

                }
            } catch (error) {
                console.log(error.message)
            }
        };

        fetchInitialData();

    }, []);

    const { cart } = useCart()

    if (!cart.length) {
        router.push('/account')
        return
    }

    //submiting for payment
    const onSubmit = async (formData) => {
        const key = process.env.NEXT_PUBLIC_STRIPE_CLIENT_KEY;

        const stripe = await loadStripe(key);
        const body = {
            products: cart,
            shipping: formData
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw Error("payment error");
        }
        const session = await response.json();
        //now we can call api request for payment
        await stripe.redirectToCheckout({
            sessionId: session.sessionId,
        });

    }




    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <div className="grid grid-cols-2 gap-4">

                    <InputControl
                        name="firstName"
                        label="firstName"
                        placeholder="firstName"
                        inputType="text"
                        formControl={form.control}
                    />
                    <InputControl
                        name="lastName"
                        label="lastName"
                        placeholder="lastName"
                        inputType="text"
                        formControl={form.control}
                    />

                    <InputControl
                        name="city"
                        label="city"
                        placeholder="city"
                        inputType="text"
                        formControl={form.control}
                    />

                    <InputControl
                        name="company"
                        label="company"
                        placeholder="company"
                        inputType="text"
                        formControl={form.control}
                    />

                    <InputControl
                        name="region"
                        label="region"
                        placeholder="region"
                        inputType="text"
                        formControl={form.control}
                    />

                    <InputControl
                        name="address"
                        label="address"
                        placeholder="address"
                        inputType="text"
                        formControl={form.control}
                    />

                    <InputControl
                        name="city"
                        label="city"
                        placeholder="city"
                        inputType="text"
                        formControl={form.control}
                    />

                    <InputControl
                        name="phone"
                        label="phone"
                        placeholder="phone"
                        inputType="phone"
                        formControl={form.control}

                    />
                    <InputControl
                        name="email"
                        label="email"
                        placeholder="email"
                        inputType="email"
                        formControl={form.control}
                    />

                </div>

                <button
                    type="submit"
                    className="mt-2 block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
                >
                    payment
                </button>
            </form>

        </Form >
    )
}




export default PlaceOrderForm;


function PaymentButton() {
    const {pending} = useFormStatus()
    return <button
        type="submit"
        disabled={pending}
        className="mt-2 block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
    >
         {pending ? 'Processing payment...' : 'Payment'}
    </button>
}









