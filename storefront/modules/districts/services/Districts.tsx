import apiClientService from "@/common/components/services/ApiClientService";
import { Districts } from "../model/Districts";

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/location`;

export async function getDistrictsList(): Promise<Districts[]> {
    const reponse = await apiClientService.get(`${baseUrl}/storefront/districtList`);
    if (!reponse.ok) {
        return [];
    } else {
        return reponse.json();
    }
}