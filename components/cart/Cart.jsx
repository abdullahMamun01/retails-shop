'use client'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { Heart, X } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import AddToWishlistBtn from '../product/cartAction/AddToWishlistBtn'
import RemoveCartBtn from '../product/cartAction/RemoveCartBtn'

export default function Cart({ cart }) {
    const [quantity, setQuantity] = useState(cart.quantity)
    const { dispatch } = useCart()

    const incrementQuantity = () => {
        setQuantity(prev => {
            const newQuantity = prev < 10 ? prev + 1 : prev;
            return newQuantity;
        });
        dispatch({ type: "ADD_TO_CART", payload: { ...cart, quantity } });

    }

    const decrementQuantity = () => {
        setQuantity(prev => {
            const newQuantity = prev > 0 ? prev - 1 : prev;
            return newQuantity;
        });
        dispatch({ type: "ADD_TO_CART", payload: { ...cart, quantity } });

    }

   

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <a href="#" className="shrink-0 md:order-1">
                    <Image width="100" height="100" src={cart?.thumbnail} alt={cart?.name} />
                    {/* <Image width="100" height="100" className="h-20 w-20 dark:hidden" src="https://m.media-amazon.com/images/I/810QQp4VpEL._AC_SL1500_.jpg" alt="imac image" /> */}

                </a>

                <label for="counter-input" className="sr-only">Choose quantity:</label>
                <div className="flex items-center justify-between md:order-3 md:justify-end">
                    <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                        <button
                            className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                            onClick={decrementQuantity}
                        >
                            -
                        </button>

                        <div className="h-8 w-8 text-base flex items-center justify-center">
                            {quantity}
                        </div>
                        <button
                            className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                            onClick={incrementQuantity}
                        >
                            +
                        </button>
                    </div>
                    <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900 dark:text-white">${cart?.price}</p>
                    </div>
                </div>

                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <Link href={`/product/${cart?.id}`} className="text-base font-medium text-gray-900 hover:underline dark:text-white">{cart?.name}</Link>

                    <div className="flex items-center gap-4">

                        <AddToWishlistBtn
                            product={cart}
                            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                            <Heart className='mr-2' />
                            Add to Wishlist
                        </AddToWishlistBtn>

                        <RemoveCartBtn
                        productId={cart.id}
                         className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                            <X className='tex-red-500 mr-2' />
                            Remove
                        </RemoveCartBtn>
                    </div>
                </div>
            </div>
        </div>
    )
}
