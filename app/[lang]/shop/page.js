import Sidebar from "@/components/Sidebar";
import ProductCart from "@/components/product/ProductCart";
import { getAllProducts, getProductCategoryList } from "@/database/queries";
import React from "react";

const decodeQueryParameter = (queryParameter) => {
  const decodedValue = decodeURI(queryParameter);
  if (decodedValue === 'undefined') {
    return undefined;
  }
  return decodedValue;
};


export default async function Shop({searchParams}) {
  
  const category = decodeQueryParameter(searchParams.category) 
  const min = searchParams.min 
  const max = searchParams.max 
  const search = decodeQueryParameter(searchParams?.search)
  const allProducts = await getAllProducts({category,min,max ,search })

  return (
    <>
      <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden hidden md:block">
        <Sidebar/>
      </div>

      <div className="col-span-3">
        <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
          {
            allProducts?.map(pd => <ProductCart key={pd.id} product={pd} />)
          }
          
        </div>
      </div>
    </>
  );
}


