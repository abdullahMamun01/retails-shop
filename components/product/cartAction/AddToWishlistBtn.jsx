"use client"

import { useWishlist } from '@/hooks/useWishlist'
import { Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

export default function AddToWishlistBtn({ className, product }) {
    const {status} = useSession()
    const { dispatch } = useWishlist()
    const router = useRouter()
    const addToWishlist = () => {
        if (status === "unauthenticated") {
            router.push('/login')
        }
        dispatch({ type: "ADD_TO_WISHLIST", payload: product })
        toast.success('Product Add from wishlist');
    }
    return (
        <button onClick={addToWishlist}
            className={className} >

            <Heart className='text-red-500' /> Add to Wishlist

        </button>
    )
}
