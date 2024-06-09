import Sidebar from "@/components/Sidebar";
import ProductCart from "@/components/product/ProductCart";
import { Spinner } from "@/components/ui/Spinner";
import { getAllProducts, getProductCategoryList } from "@/database/queries";

import React, { Suspense } from "react";

const decodeQueryParameter = (queryParameter) => {
  const decodedValue = decodeURI(queryParameter);
  if (decodedValue === "undefined") {
    return undefined;
  }
  return decodedValue;
};

export default async function Shop({ searchParams }) {
  const category = decodeQueryParameter(searchParams.category);
  const min = searchParams.min;
  const max = searchParams.max;
  const search = decodeQueryParameter(searchParams?.search);
  const page = decodeQueryParameter(searchParams?.page) || 1;

  const allProducts = await getAllProducts({
    category,
    min,
    max,
    search,
    page,
  });

  return (
    <>
      <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden hidden md:block">
        <Sidebar />
      </div>

      <div className="col-span-3">
        <Suspense fallback={<Spinner size="large" />}>
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6">
            {allProducts?.map((pd) => (
              <ProductCart key={pd.id} product={pd} />
            ))}
          </div>
        </Suspense>
      </div>
    </>
  );
}
