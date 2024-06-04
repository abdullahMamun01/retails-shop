"use client"

import { useCart } from '@/hooks/useCart'
import React from 'react'

export default function AddToCartBtn({className , product , quantity=1}) {
    const {dispatch} = useCart()
    const addToCart = () => {
        dispatch({type: "ADD_TO_CART" , payload: {...product , quantity}})
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
