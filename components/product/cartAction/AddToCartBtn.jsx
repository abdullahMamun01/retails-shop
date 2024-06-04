"use client"

import { useCart } from '@/hooks/useCart'
import React from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

export default function AddToCartBtn({ className, product, quantity = 1 }) {
    const {status} = useSession()
    const router = useRouter()
  
    const { dispatch } = useCart()

    const addToCart = () => {
        if (status === "unauthenticated") {
            router.push('/login')
        }
        dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } })
        toast.success("Product add to cart successfully")
    }

    return (
        <button
            onClick={addToCart}
            className={className}
        >
            add to cart
        </button>
    )
}
