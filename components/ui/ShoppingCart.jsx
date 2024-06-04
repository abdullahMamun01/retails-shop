"use client"
import React, { useEffect, useState } from 'react'

import { ShoppingCartIcon } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

export default function ShoppingCart() {
    const [isClient, setIsClient] = useState(false)
    const { cart } = useCart()

    useEffect(() => {
        setIsClient(true)
    }, [])
    return (
        <>
            <div className="text-2xl">
                <ShoppingCartIcon />
            </div>
            <div className="text-xs leading-3">Cart</div>
            <div
                className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                {
                    isClient ? cart.length : '0'
                }

            </div>


        </>
    )
}
