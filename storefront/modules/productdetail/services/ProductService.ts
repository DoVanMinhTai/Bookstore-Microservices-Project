import apiClientService from "@/common/components/services/ApiClientService";
import { ProductDetail } from "../model/ProductDetail";
import { ProductThumbnail } from "@/modules/homepage/models/ProductThumbnail";


const baseUrl = 'http://localhost:8087/api/product/storefront';
const serverSideRenderUrl = `${process.env.API_BASE_PATH}/product/storefront`

export async function getProductDetail(slugs: string): Promise<ProductDetail> {
    const response = await apiClientService.get(`${baseUrl}/product/${slugs}`);
    return response.json();
}

export async function getProductByIdSingle(id:number) :Promise<ProductThumbnail> {
    const reponse = await apiClientService.get(`${baseUrl}/product/${id}`);
    if(!reponse.ok) {
        throw new Error ("Error getProductById(id:number) ")
    } else {
        return reponse.json();
    }
}