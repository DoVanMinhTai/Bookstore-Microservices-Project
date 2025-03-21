import React, { createContext } from "react";
import { CartContext, CartProvider, useCartContext } from "./CartContext";
import { UserInfoProvider, useUserInfoContext } from "./UserInforProvider";

const AppContext = React.createContext({});

export function AppProvider({ children }: React.PropsWithChildren) {

    return (
        <UserInfoProvider>
            <CartProvider>
                {children}
                </CartProvider>
        </UserInfoProvider>
    )
}

export const useAppContext = () => {
    const cartContext = useCartContext();
    const userInfoContext = useUserInfoContext();
    return {
        ...userInfoContext,
        ...cartContext
    };
};