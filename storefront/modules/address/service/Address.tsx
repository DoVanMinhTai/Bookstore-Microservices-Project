import apiClientService from "@/common/components/services/ApiClientService";
import { Address } from "../model/Address";
import { AddressPostVm } from "../model/AddressPostVm";
import { AddressDetailVm } from "../model/AddressDetail";

const baseUrl = 'http://localhost:8087/api/location/storefront';

export async function createAddress(filterdata: Address) {
    console.log("here", filterdata);
    console.log("type", Array.isArray(filterdata));


    const reponse = await apiClientService.post(`${baseUrl}/addresses`, JSON.stringify(filterdata));
    console.log(reponse);
    if (!reponse.ok) {
        console.error("looi");
    } else {

        return reponse.json()
    }
}
export async function updateAddress(id: number, addressPostVm: AddressPostVm) {
    const reponse = await apiClientService.put(`${baseUrl}/addresses/${id}`, JSON.stringify(addressPostVm));
    if (!reponse.ok) {
        throw new Error("Có lỗi rồi híc :< ")
    }
    return reponse
}


export async function getAddressById(id: number): Promise<AddressDetailVm> {
    const reponse = await apiClientService.get(`${baseUrl}/addresses/${id}`);
    if (!reponse.ok) {
        throw new Error("Co loi roi")
    } else {
        return reponse.json();
    }
}

