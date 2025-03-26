import apiClientService from "@/common/components/services/ApiClientService";
import { Profile } from "../model/Profile";
import { AddressDetail } from "@/modules/address/model/AddressDetail";

const baseUrl = 'http://localhost:8087/api/customer/storefront';

export async function getMyProfile() {
    return (await apiClientService.get(`${baseUrl}/customer/profile`)).json();
}

export async function getUserAddressList() : Promise<AddressDetail[]> {
    const reponse = await apiClientService.get(`${baseUrl}/getUserAddressList`)
    if(!reponse.ok) {
        console.log("Lỗi reponse getUserAddressList");
        return [];
    } else {

        return reponse.json()
    }
}


