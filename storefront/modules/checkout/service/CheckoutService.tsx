import apiClientService from "@/common/components/services/ApiClientService";
import { Checkout } from "../model/Checkout";
import { CheckoutVm } from "../model/CheckoutVm";


const baseUrl = 'http:localhost:8087/api/orders/storefront'
const testUrl = '/api/orders/storefront'

export async function createCheckout(checkout :Checkout) : Promise<Checkout | null> {
    const reponse = await apiClientService.post(`${testUrl}/checkouts`,checkout);
    if(reponse.status < 300 && reponse.status >= 200) {
        return reponse.json();
    } else {
        throw new Error(reponse.statusText);
    }
    
}


export async function getCheckoutById(id: number):Promise<Checkout | null> {
    const reponse = await apiClientService.get(`${testUrl}/checkouts/${id}`);
    if(reponse.status < 300 && reponse.status >= 200) {
        return reponse.json();
    } else {
        throw new Error(reponse.statusText);
    }
}