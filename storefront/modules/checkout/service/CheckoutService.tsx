import apiClientService from "@/common/components/services/ApiClientService";
import { Checkout } from "../model/Checkout";
import { CheckoutVm } from "../model/CheckoutVm";


const baseUrl = 'http://localhost:8087/api/orders/storefront'
const testUrl = '/api/orders/storefront'

export async function createCheckout(checkout: Checkout): Promise<Checkout | null> {
    console.log(checkout);
    console.log("checkOut data: ", JSON.stringify(checkout, null, 2));

    const reponse = await apiClientService.post(`${baseUrl}/checkouts`, JSON.stringify(checkout));
    console.log(reponse);

    if (reponse.status < 300 && reponse.status >= 200) {
        return await reponse.json();
    } else {
        throw new Error(reponse.statusText);
    }

}


export async function getCheckoutById(id: string): Promise<Checkout> {
    const reponse = await apiClientService.get(`${baseUrl}/checkouts/${id}`);
    console.log("123787", reponse);

    if (reponse.status === 401) {
        console.error("Hết phiên đăng nhập")
    }

    if (reponse.status < 300 && reponse.status >= 200) {
        return reponse.json();
    } else {
        throw new Error(reponse.statusText);
    }
}