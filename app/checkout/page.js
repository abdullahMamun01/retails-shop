
import CheckoutForm from "@/components/order/CheckoutForm";
import OrderSummery from "@/components/order/OrderSummery";

import React from "react";

export default function CheckoutPage() {
  return (
    
    <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-12 items-start pb-16 pt-4 gap-6">
       <CheckoutForm/>
       <OrderSummery/>
      </div>
    
  );
}
