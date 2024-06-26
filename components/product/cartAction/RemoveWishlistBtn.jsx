"use client"
import { useWishlist } from '@/hooks/useWishlist'
import React from 'react'
import toast from 'react-hot-toast'

export default function RemoveWishlistBtn({children , className="" , productId}) {
    const {dispatch} = useWishlist()

    const removeFromWishlist = () => {
        dispatch({type:"REMOVE_FROM_WISHLIST" , payload: productId})
        toast.success('Product removed from cart');
    }


  return (
    <button
            onClick={removeFromWishlist}
            className={className} >

           {children} 

        </button>
  )
}
