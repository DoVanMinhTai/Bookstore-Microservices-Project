import apiClientService from "@/common/components/services/ApiClientService";
import { CartPost } from "../model/CartPost";
import { CartItemGetDetailVms, CartItemGetVm } from "../model/CartItemGetVm";
import { ProductThumbnail } from "@/modules/homepage/models/ProductThumbnail";
import { getProductById } from "@/modules/catalog/services/ProductServices";
import { CartItemDeleteVms } from "../model/CartItemDeleteVms"
import { CartItemPutVm } from "../model/CartItemPutVm";

const baseUrl = 'http://localhost:8087/api/cart/storefront';

export async function addToCartItem(payload: CartPost): Promise<CartItemGetVm> {
    const response = await apiClientService.post(`${baseUrl}/cart/add`, JSON.stringify(payload));
    if (!response.ok) {
        console.log('here1231', response);

    }
    return response.json();
}


export async function getNumberCartItem(): Promise<number> {
    const response = await apiClientService.get(`${baseUrl}/cart/list`);
    // return response.json();  
    if (!response.ok) {
        throw new Error(`Failed to fetch cart items: ${response.statusText}`);
    }
    const cartItems = await response.json();

    const numberCartItems = cartItems.reduce((
        totalQuantity: number, items: CartItemGetVm) => totalQuantity + items.quantity, 0)
    console.log(numberCartItems);
    return numberCartItems;

}

export async function getCartItems(): Promise<CartItemGetVm[]> {
    const reponse = await apiClientService.get(`${baseUrl}/cart/list`);
    if (!reponse.ok) {
        throw new Error(`FAILED to fetch object cart item get vM`);
    }
    return reponse.json();
}

export async function getCartItemDetailVms(): Promise<CartItemGetDetailVms[]> {
    const cartItems = await getCartItems()
    const cartItemsProductId = cartItems.map((items) => items.productId);
    const products = await getProductById(cartItemsProductId);
    return mapCartItemsToProduct(cartItems, products);

}

export async function deleteCartItemByProductId(productId: number) {
    const reponse = await apiClientService.delete(`${baseUrl}/cart/${productId}`);
}

function mapCartItemsToProduct(
    cartItems: CartItemGetVm[],
    products: ProductThumbnail[]
): CartItemGetDetailVms[] {
    const detailCartItem: CartItemGetDetailVms[] = [];

    const productGetId = new Map(products.map((product) => [product.id, product]));

    for (const cartI of cartItems) {
        const product = productGetId.get(cartI.productId);
        if (!product) continue;
        detailCartItem.push(
            {
                ...cartI,
                productName: product.name,
                slug: product.slug,
                thumbnailUrl: product.thumbnailUrl,
                price: product.price
            }
        )
    }
    return detailCartItem;

}

// export async function decreaseCartItemButton(payload : CartItemDeleteVms[]) : Promise<CartItemDeleteVms[]> {
//     const reponse = await apiClientService.put(`${baseUrl}/cart/items`,payload);
//     if(!reponse.ok) {
//         throw new Error("Error from server")
//     }
//     return reponse.json();
// }

export async function updateCartItem(productId: number, payload: CartItemPutVm): Promise<CartItemGetVm> {
    const reponse = await apiClientService.put(`${baseUrl}/cart/update/${productId}`, JSON.stringify(payload));
    if (!reponse.ok) {
        throw new Error("Error Fron Server");
    }
    return reponse.json();

}