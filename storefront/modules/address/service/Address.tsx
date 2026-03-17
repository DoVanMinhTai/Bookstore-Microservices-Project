import apiClientService from "@/common/components/services/ApiClientService";
import { Address } from "../model/Address";
import { AddressPostVm } from "../model/AddressPostVm";
import { AddressDetailVm } from "../model/AddressDetail";

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

export async function createUserAddress(filterdata: Address) {
    const response = await apiClientService.post(`${baseUrl}/customer/storefront/createUserAddress`, JSON.stringify(
        filterdata
    ));
    if (!response.ok) {
        throw new Error("Không thể tạo địa chỉ")
    } else {
        return response.json()
    }
}

export async function updateAddress(id: number, addressPostVm: AddressPostVm) {
    const response = await apiClientService.put(`${baseUrl}/location/storefront/addresses/${id}`, JSON.stringify(addressPostVm));
    if (!response.ok) {
        // throw new Error("Không thể cật nhật địa chỉ")
    }
    return response
}

export async function getAddressById(id: number): Promise<AddressDetailVm> {
    const reponse = await apiClientService.get(`${baseUrl}/location/storefront/addresses/${id}`);
    if (!reponse.ok) {
        throw new Error("Không thể tải thông tin địa chỉ.");
    } else {
        return reponse.json();
    }
}

