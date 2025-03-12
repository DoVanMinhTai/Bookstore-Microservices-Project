import apiClientService  from "@/common/components/services/ApiClientService";
import { CartPost } from "../model/CartPost";
import { CartItemGetVm } from "../model/CartItemGetVm";

const baseUrl = 'http://localhost:8087/api/cart/storefront';

export async function addToCartItem(payload : CartPost) : Promise<CartItemGetVm> {
    const reponse = await apiClientService.post(`${baseUrl}/cart/add`,JSON.stringify(payload));
    if(!reponse.ok) {
        console.log('here1231',reponse);
        
    }
    return reponse.json();
}