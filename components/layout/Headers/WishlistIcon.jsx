"use client"
import { useWishlist } from "@/hooks/useWishlist";
import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function WishlistIcon() {
  const [isClient, setIsClient] = useState(false)

  const { wishlist } = useWishlist()

  useEffect(() => {
    setIsClient(true)
  }, [])


  return (
    <div>
      <div className="text-2xl">
        <Heart />
      </div>
      <div className="text-xs leading-3">Wishlist</div>
      <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
       {isClient ?  wishlist?.length : '0'}
      </div>
    </div>
  );
}
