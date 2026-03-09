import { ProductBestSeller } from "../models/ProductBestSeller";
import apiClientService from "@/common/components/services/ApiClientService";
import { ProductFeature } from "../models/ProductFeature";


const baseUrl = '/api/product/storefront';

export async function getProductBestSelling(): Promise<ProductBestSeller> {
    const response = await apiClientService.get(`${baseUrl}/products/productsBestSelling`);
    return response.json();
}

export async function getProductFeature(): Promise<ProductFeature> {
    const response = await apiClientService.get(`${baseUrl}/products/productFeatured`);
    return response.json();
}