import { ProductBestSeller } from "../models/ProductBestSeller";
import apiClientService from "@/common/components/services/ApiClientService";
import { ProductFeature } from "../models/ProductFeature";


const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/storefront`;

export async function getProductBestSelling(): Promise<ProductBestSeller> {
    const response = await apiClientService.get(`${baseUrl}/products/productsBestSelling`);
    return response.json();
}

export async function getProductFeature(): Promise<ProductFeature> {
    const response = await apiClientService.get(`${baseUrl}/products/productFeatured`);
    return response.json();
}