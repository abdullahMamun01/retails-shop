"use client"
import React from 'react'
import CartSummery from './CartSummery'
import CartItems from './CartItems'
import { Card } from '../ui/card'
import { useCart } from '@/hooks/useCart'


export default function Shopping() {
  const { cart } = useCart()
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

        {
          cart?.length > 0 ?

            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">

              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  <Card className="grid grid-cols-12 p-5">
                    <div className="col-span-8 ml-5 font-bold text-sky-500">product</div>
                    <div className="col-span-2 text-center font-bold text-sky-500 ml-7">quantity</div>
                    <div className="col-span-2 text-center font-bold text-sky-500 ml-7">price</div>
                  </Card>
                  <CartItems />
                </div>

              </div>

              <CartSummery />
            </div>
            :
            <div>
              <h1 className='text-red-500 text-center  mx-2 text-2xl my-auto'>Shopping cart is empty!</h1>

            </div>
        }
      </div>
    </section>
  )
}
