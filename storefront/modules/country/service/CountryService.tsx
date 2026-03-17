import apiClientService from "@/common/components/services/ApiClientService";
import { StateOrProvince } from "@/modules/stateorprovince/model/StateOrProvince";
import { CountryVm } from "../model/CountryVm";
import { Districts } from "@/modules/districts/model/Districts";

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/location`;

export async function getAllCountries(): Promise<CountryVm[]> {
    const response = await apiClientService.get(`${baseUrl}/storefront/countries`);
    if (!response.ok) return [];
    return response.json();
}

export async function getStateOrProvinces(countryId: number): Promise<StateOrProvince[]> {
    if (!countryId) return [];
    const response = await apiClientService.get(`${baseUrl}/storefront/state-or-province/${countryId}`);
    return response.ok ? response.json() : [];
}

export async function getDistricts(stateOrProvinceId: number): Promise<Districts[]> {
    if (!stateOrProvinceId) return [];
    const response = await apiClientService.get(`${baseUrl}/storefront/district/list/${stateOrProvinceId}`);
    return response.ok ? response.json() : [];
}