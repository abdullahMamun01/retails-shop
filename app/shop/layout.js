import BreadCrump from "@/components/BreadCrump";
import PaginationComponent from "@/components/ui/PaginationComponent";
import { getTotalPage } from "@/database/queries";
import React from "react";

export default async function ShopLayout({ children }) {
  const totalPage = await getTotalPage()
  console.log(totalPage, ' page')
  return (
    <div className="w-full container">
      <BreadCrump />
      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        {children}
      </div>
      <div className="w-full">
        <PaginationComponent totalPage={totalPage}/>
      </div>
    </div>
  );
}
