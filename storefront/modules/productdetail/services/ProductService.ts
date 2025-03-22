import apiClientService from "@/common/components/services/ApiClientService";
import { ProductDetail } from "../model/ProductDetail";


const baseUrl = 'http://localhost:8087/api/product/storefront';
const serverSideRenderUrl = `${process.env.API_BASE_PATH}/product/storefront`

export async function getProductDetail(slugs: string): Promise<ProductDetail> {
    const response = await apiClientService.get(`${baseUrl}/product/${slugs}`);
    return response.json();
}