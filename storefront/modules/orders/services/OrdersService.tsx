import apiClientService from "@/common/components/services/ApiClientService";
import { OrdersPostVm } from "../model/OrdersPostVm";
import { OrderVm } from "../model/OrderVm";

const baseUrl = 'http://localhost:8087/api/orders/storefront'

export async function createOrder(ordersPostVm: OrdersPostVm): Promise<{ status: number, data: OrderVm }> {
    const reponse = await apiClientService.post(`${baseUrl}/orders`, JSON.stringify(ordersPostVm));
    const data: OrderVm = await reponse.json();
    if (!reponse.ok) {
        throw new Error("Lỗi rồi");
    } else {
        return {
            status: reponse.status,
            data: data
        };
    }
}

export async function getOrderById(id: number): Promise<OrderVm> {
    const reponse = await apiClientService.get(`${baseUrl}/orders/${id}`);
    if (!reponse.ok) {
        throw new Error("Co Looi")

    } else {
        return reponse.json();
    }

}

export async function getListOrderByCreatedBy(): Promise<OrderVm> {
    const reponse = await apiClientService.get(`${baseUrl}/orders/listOrders`)
    if (!reponse.ok) {
        throw new Error("Có Lỗi Rồi");
    } else {
        return reponse.json();

    }
}