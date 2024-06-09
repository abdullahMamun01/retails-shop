"use client";
import { useCart } from "@/hooks/useCart";
import React from "react";

export default function OrderSummery() {
  const { cart } = useCart();
  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    return Math.floor(
      originalPrice - Math.floor(originalPrice * (discountPercentage / 100))
    );
  };

  const subTotal = () => {
    return cart?.reduce((total, product) => {
      // const
      const discountedPrice =
        calculateDiscountedPrice(product.price, product.discountPercentage) *
        product.quantity;
      return total + Math.floor(discountedPrice);
    }, 0);
  };
  return (
    <div className="col-span-12 md:col-span-4 border shadow-lg border-gray-200 p-4 rounded">

      <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
        order summary
      </h4>
      <div className="space-y-2">
        {cart?.map((pd) => (
          <div key={pd.id} className="flex justify-between">
            <div>
              <h5 className="text-gray-800 font-medium">{pd.name}</h5>
              {/* <p className="text-sm text-gray-600">Size: M</p> */}
            </div>
            <p className="text-gray-600 mr-2">x {pd.quantity} </p>
            <p className="text-gray-800 font-medium">
              $
              {calculateDiscountedPrice(pd.price, pd.discountPercentage) *
                pd.quantity}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
        <p>subtotal</p>
        <p>${subTotal()}</p>
      </div>

      <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
        <p>shipping</p>
        <p>Free</p>
      </div>

      <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
        <p className="font-semibold">Total</p>
        <p>$1280</p>
      </div>
    </div>
  );
}
