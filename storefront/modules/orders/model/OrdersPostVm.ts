import { CheckoutItem } from "@/modules/checkout/model/CheckoutItem";
import { DeliveryMethod } from "./enum/DeliveryMethod"
import { PaymentMethod } from "./enum/PaymentMethod";
import { PaymentStatus } from "./enum/PaymentStatus";
import { OrderAddressPostVm } from "./OrderAddressPostVm";
import { AddressDetail } from "@/modules/address/model/AddressDetail";

export type OrdersPostVm = {
    checkoutId?: number;
    email?: string;
    shippingAddressPostVm?: AddressDetail;
    billingAddressPostVm?: AddressDetail;
    note?: string;
    tax: number;
    discount: number;
    numberItem: number;
    totalPrice: number;
    deliveryFee: number;
    couponCode?: string;
    deliveryMethod?: DeliveryMethod;
    paymentMethod?: PaymentMethod;
    paymentStatus: PaymentStatus;
    orderItemPostVmList?: CheckoutItem[]
}