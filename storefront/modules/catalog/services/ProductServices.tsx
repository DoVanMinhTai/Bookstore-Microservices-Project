import apiClientService from "@/common/components/services/ApiClientService";
import { ProductThumbnail } from "@/modules/homepage/models/ProductThumbnail";

const baseUrl = 'http://localhost:8087/api/product/storefront';

export async function getProductById(ids: number[]): Promise<ProductThumbnail[]> {
    const reponse = await apiClientService.get(`${baseUrl}/product/listProduct?productIds=${ids}`);
    if (!reponse.ok) {
        throw new Error("Fetch api error")
    }
    return reponse.json();
}