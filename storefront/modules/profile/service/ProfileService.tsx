import apiClientService from "@/common/components/services/ApiClientService";
import { Profile } from "../model/Profile";

const baseUrl = 'http://localhost:8087/api/customer/storefront';

export async function getMyProfile()  {
    return (await apiClientService.get(`${baseUrl}/customer/profile`)).json();
}