'use client'
import { FormContext } from "@/app/context";
import { useContext } from "react";

export const useFormContext = () => {
    return useContext(FormContext);
};