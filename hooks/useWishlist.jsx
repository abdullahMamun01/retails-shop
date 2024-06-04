import { WishlistContext } from "@/app/context";
import { useContext } from "react";

export const useWishlist = () => useContext(WishlistContext);