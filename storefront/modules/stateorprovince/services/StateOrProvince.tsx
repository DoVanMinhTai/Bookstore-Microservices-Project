import apiClientService from "@/common/components/services/ApiClientService";
import { StateOrProvince } from "../model/StateOrProvince";

const baseUrl = 'http://localhost:8087/api/location';

export async function getStateOrProvinces(): Promise<StateOrProvince[]> {
    const reponse = await apiClientService.get(`${baseUrl}/storefront/stateOrProvinceList`);
    if (!reponse.ok) {
        console.log("Error StateOrProvinceList")
        return [];
    } else {
        return reponse.json();
    }
}