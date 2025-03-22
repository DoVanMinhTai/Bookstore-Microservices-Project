import apiClientService from "@/common/components/services/ApiClientService";
import { CountryListGetVm } from "../model/CountryListGetVm";
import { StateOrProvince } from "@/modules/stateorprovince/model/StateOrProvince";
import { CountryVm } from "../model/CountryVm";
import { Districts } from "@/modules/districts/model/Districts";

const baseUrl = 'http://localhost:8087/api/location';

export async function getAllCoutries() : Promise<CountryVm[]> {
    const reponse = await apiClientService.get(`${baseUrl}/countries`);
    return reponse.json();
}

export async function getDistricts(stateOrProvinceId: number) : Promise<Districts[]> {
    const reponse = await apiClientService.get(`${baseUrl}/${stateOrProvinceId}`);
    return reponse.json();
}

export async function getStateOrProvinces(countryId: number) : Promise<StateOrProvince[]> {
    const reponse = await apiClientService.get(`${baseUrl}/${countryId}`);
    return reponse.json();
}