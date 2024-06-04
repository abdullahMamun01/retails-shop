import BillingAddress from '@/components/user/BillingAddress'
import ProfileInfo from '@/components/user/ProfileInfo'
import ShippingAddress from '@/components/user/ShippingAddress'
import React from 'react'

export default function AccountPage() {
  return (
    <div className="container  items-start gap-6 pt-4 pb-16">
     
        <div className=" grid grid-cols-3 gap-4 mx-auto max-w-5xl">
        <ProfileInfo/>
        <ShippingAddress/>
        <BillingAddress/>
        </div>
    </div>
  )
}
