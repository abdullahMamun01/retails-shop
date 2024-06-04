"use client"
import React from 'react'
import WishlistCart from './WishlistCart'
import { useWishlist } from '@/hooks/useWishlist'

export default function WishlistItems() {
    const {wishlist} = useWishlist()
  
    return (
        <div class="mx-auto space-y-4 max-w-6xl">
            
            {
                wishlist.length > 0 ?  wishlist.map(wl => <WishlistCart key={wl.id} wishlist={wl} />)
                :
                <h1 className='text-red-500 text-lg font-bold text-center my-10'>wishlist is empty!</h1>
            }
        </div>
    )
}
