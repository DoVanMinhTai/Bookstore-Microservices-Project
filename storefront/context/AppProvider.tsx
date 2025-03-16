import React, { createContext } from "react";
import { CartContext, CartProvider, useCartContext } from "./CartContext";

const AppContext = React.createContext({});

export function AppProvider({children}: React.PropsWithChildren) {
    
    return (
        <CartProvider>{children}</CartProvider>
    )
}

export const useAppContext = () => {
    const cartContext = useCartContext();

    return {
        ...cartContext
    };
};