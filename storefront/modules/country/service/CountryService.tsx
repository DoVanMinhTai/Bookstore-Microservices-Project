import apiClientService from "@/common/components/services/ApiClientService";
import { CountryListGetVm } from "../model/CountryListGetVm";
import { StateOrProvince } from "@/modules/stateorprovince/model/StateOrProvince";
import { CountryVm } from "../model/CountryVm";
import { Districts } from "@/modules/districts/model/Districts";

const baseUrl = 'http://localhost:8087/api/location';

export async function getAllCountries() : Promise<CountryVm[]> {
    const reponse = await apiClientService.get(`${baseUrl}/storefront/countries`);
    console.log("checktype",Array.isArray(reponse));
    if(!reponse.ok) {
        throw new Error("error 12345")
        console.log("error23")
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