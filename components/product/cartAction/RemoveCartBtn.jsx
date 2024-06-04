import { useCart } from '@/hooks/useCart'
import { Heart } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'

export default function RemoveCartBtn({productId,className="",children}) {
    const {dispatch} = useCart()
    const removeFromCart = () => {
        dispatch({type: "REMOVE_FROM_CART" ,payload: productId})
        toast.success('Product removed from cart');
    }
    return (
        <button
            onClick={removeFromCart}
            className={className} >

           {children}

        </button>
    )
}
