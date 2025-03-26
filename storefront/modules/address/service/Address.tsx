import apiClientService from "@/common/components/services/ApiClientService";
import { Address } from "../model/Address";

const baseUrl = 'http://localhost:8087/api/location/storefront';

export async function createAddress(filterdata:Address) {
    console.log("here",filterdata);
    console.log("type",Array.isArray(filterdata));
    
    
    const reponse = await apiClientService.post(`${baseUrl}/addresses`,JSON.stringify(filterdata));
   console.log(reponse);
    if(!reponse.ok) {
        console.error("looi");
    } else {

    return reponse.json()
    }
}

