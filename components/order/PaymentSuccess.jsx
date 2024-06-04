'use client'
import { useCart } from '@/hooks/useCart'

import { Check } from 'lucide-react'
import { useSession } from 'next-auth/react'
import {  useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'



export default function PaymentSuccess() {
const searchParams = useSearchParams()  
  const params = new URLSearchParams(searchParams)
  const router = useRouter()
  const {cart , dispatch} = useCart()

  const sessionId = params.get("session_id")
  const {data: {user}} = useSession()

  useEffect(() => {
    if(!cart.length){
      router.push('/account')
      return
    }
    

    const invoiceSend = async () =>{
      try {
          const response = await fetch(`/api/stripe/success` ,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId : sessionId,
              userId : user.id
            }),
          })
          
          if(!response.ok){
            throw Error('failed to send invoice!')
          }
          if(response.ok){
            dispatch({type: "CLEAR_CART"})
            setTimeout(() => {
              router.push('/shop')
            }, 5000)
          }
      } catch (error) {
        console.log(error.message)
      }
    }

    invoiceSend()

  }, [sessionId])

  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6  md:mx-auto">
        <Check className='bg-green-500 mx-auto text-white text-2xl rounded-full w-10 h-10 rounded-r-full my-5' />
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
          <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
          <p> Have a great day!  </p>
          <div className="py-10 text-center">
            <a href="#" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
              GO BACK
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
