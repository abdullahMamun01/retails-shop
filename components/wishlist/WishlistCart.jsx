"use client"
import { Trash } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import AddToCartBtn from '../product/cartAction/AddToCartBtn'
import RemoveWishlistBtn from '../product/cartAction/RemoveWishlistBtn'

export default function WishlistCart({ wishlist }) {

    const availability = wishlist?.inStock ? "In Stock" : "Out of Stock"
    return (
        <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
            <div className="w-28">
                <Image width="100" height="100" src={wishlist?.thumbnail} alt="product 6" className="w-full" />
            </div>
            <div className="w-1/3">
                <h2 className="text-gray-800 text-xl font-medium uppercase">Italian L shape</h2>
                <p className="text-gray-500 text-sm">Availability: <span className={`${wishlist?.inStock ? "text-green-500" : "text-red-500"}`}>{availability}</span></p>
            </div>
            <div className="text-primary text-lg font-semibold">${wishlist?.price}</div>
            <AddToCartBtn
                product={wishlist}
                className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
                add to cart
            </AddToCartBtn>

            <div className="text-gray-600 cursor-pointer hover:text-primary">
                <RemoveWishlistBtn productId={wishlist.id} className="text-gray-600 cursor-pointer hover:text-primary">

                    <Trash /> 
                </RemoveWishlistBtn>
            </div>
        </div>
    )
}
