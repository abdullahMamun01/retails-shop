"use client"
import { useWishlist } from '@/hooks/useWishlist'
import React from 'react'

export default function RemoveWishlistBtn({children , className="" , productId}) {
    const {dispatch} = useWishlist()

    const removeFromWishlist = () => {
        dispatch({type:"REMOVE_FROM_WISHLIST" , payload: productId})
        console.log('click remove....')
    }


  return (
    <button
            onClick={removeFromWishlist}
            className={className} >

           {children} 

        </button>
  )
}
