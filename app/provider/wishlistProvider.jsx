"use client"
import { useEffect, useReducer } from "react";
import { WishlistContext } from "../context";
import { wishlistReducer } from "../reducers/wishlistReducer";
import useLocalStorage from "@/hooks/useLocalStorage";


export const WishlistProvider = ({ children }) => {
    const [value,setValue] = useLocalStorage('wishlist' , [])
    const [wishlist, dispatch] = useReducer(wishlistReducer, value);

    useEffect(() => {
        setValue(wishlist)
    }, [wishlist])

    return (
        <WishlistContext.Provider value={{ wishlist, dispatch }}>
            {children}
        </WishlistContext.Provider>
    );
};