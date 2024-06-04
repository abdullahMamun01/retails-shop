"use client"
import { useCart } from '@/hooks/useCart';
import React, { useState } from 'react';

const QuantitySelector = ({ productId }) => {
    const initialQuantity = 1 
    const minQuantity = 1 
    const maxQuantity = 10
    console.log(productId)
  const [quantity, setQuantity] = useState(initialQuantity);
    const {cart,dispatch} = useCart()


  const incrementQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
      console.log(productId , " from")
      dispatch({type: "INCREMENT_QUANTITY" ,payload: productId})
    }
  };
  console.log(cart)
  const decrementQuantity = () => {
    if (quantity > minQuantity) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
      <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
        <div
          className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
          onClick={decrementQuantity}
        >
          -
        </div>
        <div className="h-8 w-8 text-base flex items-center justify-center">
          {quantity}
        </div>
        <div
          className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
          onClick={incrementQuantity}
        >
          +
        </div>
      </div>
    </div>
  );
};

export default QuantitySelector;
