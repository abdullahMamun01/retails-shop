import Image from 'next/image'
import React from 'react'
import ProductImageGallery from './ProductImageGallery'
import CartAction from './CartAction'
import { FacebookIcon, Instagram, InstagramIcon, TwitterIcon } from 'lucide-react'
import SocialShare from '../share/SocialShare'

export default function ProductDetails({ product }) {
    const discountPrice = product?.price - Math.floor(product?.price * (product?.discountPercentage / 100))

    return (
        <div className="container grid grid-cols-2 gap-6">
            <div>

                <ProductImageGallery images={product?.images} name={product?.name} thumbnail={product?.thumbnail} />
            </div>

            <div>
                <h2 className="text-3xl font-medium uppercase mb-2">{product?.name}</h2>
                <div className="flex items-center mb-4">
                    <div className="flex gap-1 text-sm text-yellow-400">
                        <span><i className="fa-solid fa-star"></i></span>
                        <span><i className="fa-solid fa-star"></i></span>
                        <span><i className="fa-solid fa-star"></i></span>
                        <span><i className="fa-solid fa-star"></i></span>
                        <span><i className="fa-solid fa-star"></i></span>
                    </div>
                    <div className="text-xs text-gray-500 ml-3">({product?.reviews?.length} Reviews)</div>
                </div>
                <div className="space-y-2">
                    <p className="text-gray-800 font-semibold space-x-2">
                        <span>Availability: </span>
                        <span className="text-green-600">{product?.inStock ? 'In Stock' : 'No Stock '}</span>
                    </p>
                    <p className="space-x-2">
                        <span className="text-gray-800 font-semibold">Brand: </span>
                        <span className="text-gray-600">{product?.brand}</span>
                    </p>
                    <p className="space-x-2">
                        <span className="text-gray-800 font-semibold">Category: </span>
                        <span className="text-gray-600">{product?.category}</span>
                    </p>
                    <p className="space-x-2">
                        <span className="text-gray-800 font-semibold">SKU: </span>
                        <span className="text-gray-600">{product?.variants[0]?.sku}</span>
                    </p>
                </div>
                <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                    <p className="text-base text-gray-400 ">${discountPrice.toFixed(2)}</p>
                    <p className="text-xl text-primary font-semibold line-through">${product?.price}</p>
                </div>

                <p className="mt-4 text-gray-600">
                    {product?.description}
                </p>

                <CartAction product={product} />
                <SocialShare />
            </div>
        </div>
    )
}
