import ProductDetails from "@/components/product/ProductDetails";
import RelatedProductList from "@/components/product/RelatedProductList";
import { getRelatedProducts, getSingleProduct } from "@/database/queries";
import React from "react";

export async function generateMetadata({ params:{productId} }, parent) {

  const product =  await getSingleProduct(productId) 

  const previousImages = (await parent).openGraph?.images[0] || [];
  return {
      title: product?.name,
      description: product?.description.slice(0, 100),
      openGraph: {
          images: [
              {
                  url: product?.images[0],
                  width: 1080,
                  height: 566,
              }
          ],
      },
  };
}



export default async function SingleProduct({params : {productId}}) {
  const product = await getSingleProduct(productId)

  return (
    <div>
      <ProductDetails product={product} />
      <div className="container pb-16">
        <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
          Product details
        </h3>
        <div className="w-3/5 pt-6">
          <div className="text-gray-600">
           {product?.description}
          </div>
        </div>
      </div>
      <RelatedProductList productId={product?.id} tags={product.tags} category={product.category}/>
    </div>
  );
}
