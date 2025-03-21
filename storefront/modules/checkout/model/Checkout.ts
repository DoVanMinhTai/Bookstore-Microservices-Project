import { CheckoutItem } from "./CheckoutItem";

export type Checkout = {
    id?: number;
    email: string;
    note?: '';
    promotionCode?: string;
    checkOutItemPostVms: CheckoutItem[];

}