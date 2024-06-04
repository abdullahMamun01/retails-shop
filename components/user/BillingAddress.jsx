
import React from 'react'
import EditBtn from '../ui/edit/EditBtn'
import FormAddress from '../form/FormAddress'

import {  updateBillingAddress } from '@/app/actions'
import { getUser } from '@/database/queries'
import { auth } from '@/auth'


export default async function BillingAddress() {
    const session = await auth()
    const user = await getUser(session.user.id)
    const billing = user?.billing

    return (
        <div className="shadow rounded bg-white px-4 pt-6 pb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-800 text-lg">Billing address</h3>
                <EditBtn>
                    <FormAddress addressType="billing" formAction={updateBillingAddress} />
                </EditBtn>
            </div>
            <div className="space-y-1">
                <h4 className="text-gray-700 font-medium">{user?.name}</h4>
                <p className="text-gray-800">{billing?.streetAddress}</p>
                <p className="text-gray-800">{billing?.postalCode}</p>
                <p className="text-gray-800">{billing?.country}</p>
                <p className="text-gray-800">{billing?.street}</p>
                <p className="text-gray-800">{billing?.phoneNumber}</p>
            </div>
        </div>
    )
}
