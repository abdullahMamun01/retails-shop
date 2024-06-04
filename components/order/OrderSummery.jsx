"use client"
import { useCart } from "@/hooks/useCart";
import React from "react";

export default function OrderSummery() {
    const { cart } = useCart()
    const calculateDiscountedPrice = (originalPrice, discountPercentage ) => {
        return Math.floor( originalPrice - Math.floor(originalPrice  * (discountPercentage / 100) ))
    }

    const subTotal = () => {
        return cart?.reduce((total, product) => {
            // const 
            const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage) * product.quantity ;
            return total + Math.floor(discountedPrice);
        }, 0);
    }
    return (
        <div className="col-span-4 border border-gray-200 p-4 rounded">
            <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
                order summary
            </h4>
            <div className="space-y-2">
                {
                    cart?.map(pd =>

                        <div key={pd.id} className="flex justify-between">
                            <div>
                                <h5 className="text-gray-800 font-medium">{pd.name}</h5>
                                {/* <p className="text-sm text-gray-600">Size: M</p> */}
                            </div>
                            <p className="text-gray-600 mr-2">x {pd.quantity} </p> 
                            <p className="text-gray-800 font-medium">${calculateDiscountedPrice(pd.price , pd.discountPercentage) * pd.quantity}</p>
                        </div>

                    )
                }


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

          
                {/* <div className="flex items-center mb-4 mt-2">
                    <input
                        type="checkbox"
                        name="aggrement"
                        id="aggrement"
                        className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
                        required
                    />
                    <label
                        for="aggrement"
                        className="text-gray-600 ml-3 cursor-pointer text-sm"
                    >
                        I agree to the{" "}
                        <a href="#" className="text-primary">
                            terms & conditions
                        </a>
                    </label>
                </div>

                <button
                   
                    type="submit"
                    className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
                >
                    Place order
                </button> */}
  

        </div>
    );
}
