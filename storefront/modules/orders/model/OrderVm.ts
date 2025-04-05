import { AddressDetailVm } from "@/modules/address/model/AddressDetail";
import { DeliveryMethod } from "./enum/DeliveryMethod";
import { PaymentStatus } from "./enum/PaymentStatus";
import { DeliveryStatus } from "./enum/DeliveryStatus";
import { OrderStatus } from "./enum/OrderStatus";
import { OrderItemVm } from "./OrderItemVm";

export type OrderVm = {
    id: number;
    email: string;
    shippingAddressVm: AddressDetailVm;
    billingAddressVm: AddressDetailVm;
    note: string;
    tax: number;
    discount: number;
    numberItem: number;
    totalPrice: number;
    deliveryFee: number;
    couponCode: string;
    orderStatus: OrderStatus;
    deliveryMethod: DeliveryMethod;
    deliveryStatus: DeliveryStatus;
    paymentStatus: PaymentStatus;
    orderItemVms: Set<OrderItemVm>;
    checkoutId: string;
}