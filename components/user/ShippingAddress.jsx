import React from 'react'
import FormAddress from '../form/FormAddress'
import EditBtn from '../ui/edit/EditBtn'
import { updateShippingAddress } from '@/app/actions'
import { getUser } from '@/database/queries'
import { auth } from '@/auth'

export default async function ShippingAddress() {
    const session = await auth()
    const user = await getUser(session.user.id)
    const shipping = user?.shipping
    return (
        <div className="shadow rounded bg-white px-4 pt-6 pb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-800 text-lg">Shipping address</h3>
                <EditBtn>
                    <FormAddress addressType="shipping" formAction={updateShippingAddress}/>
                </EditBtn>
            </div>
            <div className="space-y-1">
            <h4 className="text-gray-700 font-medium">{user?.name}</h4>
                <p className="text-gray-800">{shipping?.streetAddress}</p>
                <p className="text-gray-800">{shipping?.postalCode}</p>
                <p className="text-gray-800">{shipping?.country}</p>
                <p className="text-gray-800">{shipping?.street}</p>
                <p className="text-gray-800">{shipping?.phoneNumber}</p>
            </div>
        </div>
    )
}
