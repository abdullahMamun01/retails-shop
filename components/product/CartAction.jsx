"use client"
import React, { useState } from 'react'

import AddToCartBtn from './cartAction/AddToCartBtn'
import AddToWishlistBtn from './cartAction/AddToWishlistBtn'

export default function CartAction({product}) {
    const [quantity, setQuantity] = useState(1)
   
    const incrementQuantity = () => {
        if (quantity < 10)
            setQuantity(prev => prev + 1)
    }

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

   

    

    return (
        <div>
            <div className="mt-4">
                <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
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
            </div>



            <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                <AddToCartBtn
                    product={product}
                    quantity={quantity}
                    className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition">
                    Add to cart
                </AddToCartBtn> 

                <AddToWishlistBtn
                    product={product}
                    className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition">
                   
                </AddToWishlistBtn>
            </div>
        </div>
    )
}
