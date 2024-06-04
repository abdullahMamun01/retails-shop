"use client"
import { useEffect, useReducer } from "react";
import { CartContext } from "../context";
import { cartReducer } from "../reducers/cartReducer";
import useLocalStorage from "@/hooks/useLocalStorage";

// Function to safely get initial cart state from local storage


export const CartProvider = ({ children }) => {
    const [value, setValue] = useLocalStorage('cart', [])

    const [cart, dispatch] = useReducer(cartReducer, value);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        setValue(cart)
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};
