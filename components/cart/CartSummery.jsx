"use client"
import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import React from 'react'
export default function CartSummery() {
    const {cart} = useCart()
    const cartSummery = cart?.reduce((acc,pd) => {
        const originalPrice =  Math.floor(pd.price * pd.quantity)
        const discountPrice  = Math.floor((originalPrice * pd.quantity ) * ( pd.discountPercentage / 100 ))
        const totalPrice =  originalPrice - discountPrice

        if(acc["originalPrice"]){
            acc["originalPrice"] =  acc["originalPrice"] + originalPrice
        }else{
            acc["originalPrice"] =   originalPrice
        }

        if(acc["discountPrice"]){
            acc["discountPrice"] = acc["discountPrice"] + discountPrice
        }else{
            acc["discountPrice"] =  discountPrice
        }

        if(acc["total"]){
            acc["total"] = acc["total"] + (originalPrice - discountPrice )
        }else{
            acc["total"] = originalPrice - discountPrice
        }

        if(acc["totalPrice"]){
            acc["totalPrice"] = acc["totalPrice"] +   totalPrice

        }else{
            acc["totalPrice"] = totalPrice
        }

        return acc
    } , {})
    console.log( cartSummery ,cart , ' summer')
    return (
        <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p class="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                <div class="space-y-4">
                    <div class="space-y-2">
                        <dl class="flex items-center justify-between gap-4">
                            <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                            <dd class="text-base font-medium text-gray-900 dark:text-white">${cartSummery?.originalPrice}</dd>
                        </dl>

                        <dl class="flex items-center justify-between gap-4">
                            <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                            <dd class="text-base font-medium text-green-600">(-${cartSummery?.discountPrice})</dd>
                        </dl>

                        <dl class="flex items-center justify-between gap-4">
                            <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                            <dd class="text-base font-medium text-gray-900 dark:text-white">$0</dd>
                        </dl>

                        <dl class="flex items-center justify-between gap-4">
                            <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                            <dd class="text-base font-medium text-gray-900 dark:text-white">$0</dd>
                        </dl>
                    </div>

                    <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                        <dd class="text-base font-bold text-gray-900 dark:text-white">${cartSummery?.totalPrice}</dd>
                    </dl>
                </div>

                <Link href="/en/checkout" class="flex w-full items-center bg-red-500 justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</Link>

                <div class="flex items-center justify-center gap-2">
                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                    <a href="#" title="" class="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                        Continue Shopping
                        <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                        </svg>
                    </a>
                </div>
            </div>

        </div>
    )
}
