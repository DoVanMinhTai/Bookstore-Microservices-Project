import { CountryVm } from "./CountryVm";

export type CountryListGetVm = {
    countryContent: CountryVm[];
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    isLast: boolean;
}