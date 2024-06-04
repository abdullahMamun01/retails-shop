import { Heart, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToCartBtn from "./cartAction/AddToCartBtn";

export default function ProductCart({ product }) {
  const calculateDiscount =
    product?.price * (product?.discountPercentage / 100);
  const afterDiscountPrice = (product?.price - calculateDiscount).toFixed(2);

  return (
    <div className="bg-white shadow rounded overflow-hidden group my-2">
      <div className="relative">
        <Image
          src={product?.thumbnail}
          alt="product 1"
          width="294"
          height="294"
          className="w-full h-[294px]"
        />
        <div
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
        justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
        >
          <Link
            href="/"
            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            title="view product"
          >

            <Search className="text-red-500 rounded-full text-lg " />
          </Link>
          <Link
            href="/"
            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            title="add to wishlist"
          >
            <Heart className="text-red-500 rounded-full text-lg " />
          </Link>
        </div>
      </div>
      <div className="pt-4 pb-3 px-4">
        <Link href={`/en/product/${product?.id}`}>
          <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
            {product?.name}
          </h4>
        </Link>
        <div className="flex items-baseline mb-1 space-x-2">
          <p className="text-xl text-primary font-semibold">
            ${afterDiscountPrice}
          </p>
          <p className="text-sm text-gray-400 line-through">
            ${product?.price}
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex gap-1 text-sm text-yellow-400">
            <span>
              <i className="fa-solid fa-star"></i>
            </span>
            <span>
              <i className="fa-solid fa-star"></i>
            </span>
            <span>
              <i className="fa-solid fa-star"></i>
            </span>
            <span>
              <i className="fa-solid fa-star"></i>
            </span>
            <span>
              <i className="fa-solid fa-star"></i>
            </span>
          </div>
          <div className="text-xs text-gray-500 ml-3">
            ({product?.totalRatings})
          </div>
        </div>
      </div>
      <AddToCartBtn
        product={product}
        className="block w-full mt-auto py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">
        Add to cart
      </AddToCartBtn>
    </div>
  );
}
