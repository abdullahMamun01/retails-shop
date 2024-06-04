import BreadCrump from "@/components/BreadCrump";
import React from "react";

export default function ShopLayout({ children }) {
  
  return (
    <div>
      <BreadCrump />
      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        {children}
      </div>
    </div>
  );
}
