import apiClientService from "@/common/components/services/ApiClientService";
import { Profile } from "../model/Profile";
import { AddressDetailVm } from "@/modules/address/model/AddressDetail";

const baseUrl = 'http://localhost:8087/api/customer/storefront';

export async function getMyProfile() {
    return (await apiClientService.get(`${baseUrl}/customer/profile`)).json();
}

export async function getUserAddressList() : Promise<AddressDetailVm[]> {
    const reponse = await apiClientService.get(`${baseUrl}/getUserAddressList`)
    if(!reponse.ok) {
        console.log("Lỗi reponse getUserAddressList");
        return [];
    } else {

        return reponse.json()
    }
}

export async function getAddressDefault() : Promise<AddressDetailVm| undefined> {
    const reponse = await apiClientService.get(`${baseUrl}/getAddressIsActive`);
    if(!reponse.ok) {
        console.error("có lỗi gì đó")

    } else {
        return reponse.json();
    }
    
}

export async function getAddressBillingList() {
    const reponse = await apiClientService.get(`${baseUrl}/getAddressBillingIsActive`);
    if(!reponse.ok) {
        return [];
    } else {
        return reponse.json();
    }
}

