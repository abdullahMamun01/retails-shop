"use client"

import React from 'react'
import Cart from './Cart'
import { useCart } from '@/hooks/useCart'

export default function CartItems() {
    const {cart:carts} = useCart()
   
    return (
       <div>
        {
            carts.map(cart => <Cart key={cart.id} cart={cart} />)
        }
      
       </div>
    )
}
