"use client"

import { useWishlist } from '@/hooks/useWishlist'
import { Heart } from 'lucide-react'
import React from 'react'

export default function AddToWishlistBtn({ className, product }) {
    const { dispatch } = useWishlist()
    const addToWishlist = () => {
        dispatch({ type: "ADD_TO_WISHLIST", payload: product })
    }
    return (
        <button onClick={addToWishlist}
            className={className} >

            <Heart className='text-red-500' /> Add to Wishlist

        </button>
    )
}
