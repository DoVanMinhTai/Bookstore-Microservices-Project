import apiClientService from "@/common/components/services/ApiClientService";
import { AddressDetailVm } from "@/modules/address/model/AddressDetail";

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/storefront`;

export async function getMyProfile() {
    const response = await apiClientService.get(`${baseUrl}/customer/profile`)
    if(!response.ok) {

    } else {
        return response.json();
    }
}

export async function getUserAddressList() : Promise<AddressDetailVm[]> {
    const reponse = await apiClientService.get(`${baseUrl}/getUserAddressList`)
    if(!reponse.ok) {
        return [];
    } else {
        return reponse.json()
    }
}

export async function getAddressDefault() : Promise<AddressDetailVm| undefined> {
    const reponse = await apiClientService.get(`${baseUrl}/getAddressIsActive`);
    if(!reponse.ok) {
        return undefined;
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

