import apiClientService from "@/common/components/services/ApiClientService";
import { Checkout } from "../model/Checkout";
import { CheckoutVm } from "../model/CheckoutVm";


const baseUrl = 'http://localhost:8087/api/orders/storefront'

export async function createCheckout(checkout: Checkout): Promise<Checkout | null> {
    const reponse = await apiClientService.post(`${baseUrl}/checkouts`, JSON.stringify(checkout));

    if (reponse.status < 300 && reponse.status >= 200) {
        return await reponse.json();
    } else {
        throw new Error(reponse.statusText);
    }
}

export async function getCheckoutById(id: string): Promise<Checkout> {
    const reponse = await apiClientService.get(`${baseUrl}/checkouts/${id}`);

    if (reponse.status === 401) {
    }

    if (reponse.status < 300 && reponse.status >= 200) {
        return reponse.json();
    } else {
        throw new Error(reponse.statusText);
    }
}