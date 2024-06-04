"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import { useCart } from '@/hooks/useCart';

import {
    Form
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputControl from './InputControl';
import { useFormContext } from '@/hooks/useFormContext';
import { useRouter } from 'next/navigation';
import { doPayment } from '@/app/actions';
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

const initialState  = {
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
                    console.log(shipping, ' data')
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

    const onSubmit = async (formData) => {
        const key =
        "pk_test_51PMl2t05X6ShhpbB03LroPjRrT1SMea5f9YJzYUHWBspOCYOLFGYFbJZmdwHYhsTwdlE401n734B3KlCnmMKUsAU00MVBMYT6k";
        const stripe = await loadStripe(key);
        const body = {
            products:cart,
            shipping:formData
          };
          const response = await fetch("http://localhost:3000/api/stripe/payment", {
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









