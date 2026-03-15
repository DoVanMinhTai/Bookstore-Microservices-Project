import apiClientService from "@/common/components/services/ApiClientService";
import { StateOrProvince } from "@/modules/stateorprovince/model/StateOrProvince";
import { CountryVm } from "../model/CountryVm";
import { Districts } from "@/modules/districts/model/Districts";

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/location`;

export async function getAllCountries() : Promise<CountryVm[]> {
    const reponse = await apiClientService.get(`${baseUrl}/storefront/countries`);
    if(!reponse.ok) {
    }
    return await reponse.json();
}

export async function getDistricts(stateOrProvinceId: number) : Promise<Districts[]> {
    const reponse = await apiClientService.get(`${baseUrl}/storefront/district/list/${stateOrProvinceId}`);
    return reponse.json();
}

export async function getStateOrProvinces(countryId: number) : Promise<StateOrProvince[]> {
    const reponse = await apiClientService.get(`${baseUrl}/storefront/state-or-province/${countryId}`);
    return reponse.json();
}