import { CartContext } from "@/app/context";
import { useContext } from "react";

export const useCart = () => useContext(CartContext);