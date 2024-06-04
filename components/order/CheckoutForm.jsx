'use client'

import PlaceOrderForm from '../form/PlaceOrderForm'


export default function CheckoutForm() {

 
    return (
        <div className="col-span-8 border border-gray-200 p-4 rounded">
            <h3 className="text-lg font-medium capitalize mb-4">Checkout</h3>
            <PlaceOrderForm/>

        </div>
    )
}
