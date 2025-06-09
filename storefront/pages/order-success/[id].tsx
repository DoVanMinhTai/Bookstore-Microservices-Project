import ImageWithFallBack from '@/common/components/ImageWithFallBack';
import { CartItemGetDetailVms } from '@/modules/cart/model/CartItemGetVm';
import { getProductById } from '@/modules/catalog/services/ProductServices';
import { ProductThumbnail } from '@/modules/homepage/models/ProductThumbnail';
import { OrderVm } from '@/modules/orders/model/OrderVm';
import { getOrderById } from '@/modules/orders/services/OrdersService';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'


const Index = () => {
    const router = useRouter();
    const { id } = router.query;
    const [order, setOrder] = useState<OrderVm | undefined>();
    const [products, setProducts] = useState<ProductThumbnail[]>();
    const [cartItems, setCartItem] = useState<CartItemGetDetailVms[]>([]);

    useEffect(() => {
        if (id) {
            getOrderById(Number(id)).then((res) => setOrder(res)).catch((error) => console.error(error));
        }
    }, [id])

    useEffect(() => {
        if (order) {
            if (order.orderItemVms) {
                getProductById(order?.orderItemVms ? Array.from(order?.orderItemVms).map(item => item.productId) : [])
                    .then((res) => setProducts(res))
                    .catch((error) => console.error(error));
            }
        }
    }, [order]);

    useEffect(() => {
        const updatedCartItems: CartItemGetDetailVms[] = [];
        if (order) {
            if (products) {
                    if (order?.orderItemVms) {

                        [...order?.orderItemVms].map((order) => {
                            const product = products.find((item) => item.id === order.productId);
                            updatedCartItems.push({
                                productId: product ? product.id : 0,
                                quantity: order.quantity,
                                productName: product ?  product.name : "",
                                thumbnailUrl: product ?  product.thumbnailUrl : "",
                                price: order.productPrice
                            });
                        });
                    }
                setCartItem(updatedCartItems);

            }
        }
    }, [products, order])
  
    return (
        order && (<>
            <div className="container  mx-auto ">
                <div className=" justify-center mx-auto  bg-white p-6 rounded-lg shadow-lg w-[700px]">
                    <div className="flex flex-col  w-full">
                        <div className="flex justify-center">
                            <img className="w-44 h-44" src="/static/images/orderSuccess.png" alt="" />
                        </div>
                        <div className="flex justify-center mt-5 text-center font-bold text-gray-700  ">Cảm ơn bạn</div>
                        <div className="flex justify-center mt-3 text-center  ">Chúng tôi đã nhận được đơn hàng của bạn và sẽ giao trong khoảng 5- 7 ngày </div>
                    </div>
                    <div className="flex w-full  justify-center mt-5">
                        <div>
                            <div className="flex w-full flex-col">
                                <label htmlFor="" className="text-center font-bold text-gray-700 ">Tổng quan hóa đơn</label>
                                {cartItems && order ? (
                                    <table className="min-w-full table-auto mt-5">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="py-2 px-4 border-b font-bold text-gray-700 text-left">ID</th>
                                                <th className="py-2 px-4 border-b font-bold text-gray-700 text-left">Ảnh</th>
                                                <th className="py-2 px-4 border-b font-bold text-gray-700 text-left">Tên sản phẩm</th>
                                                <th className="py-2 px-4 border-b font-bold text-gray-700 text-left">Số lượng</th>
                                                <th className="py-2 px-4 border-b font-bold text-gray-700 text-left">Gía</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map((cartItem, index) => (
                                                <tr key={cartItem.productId} className="border-b">
                                                    <td className="py-2 px-4">{index}</td>
                                                    <td className="py-2 px-4">
                                                        <ImageWithFallBack
                                                            src={cartItem.thumbnailUrl}
                                                            alt={cartItem.productName}
                                                            className="w-16 h-16 border-2 rounded-md"
                                                        />
                                                    </td>
                                                    <td className="py-2 px-4">{cartItem.productName}</td>
                                                    <td className="py-2 px-4">{cartItem.quantity}</td>
                                                    <td className="py-2 px-4">{cartItem.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>


                        </div>

                    </div>

                <div>Tiếp tục mua hàng</div>
                <div>Xem lịch sử đơn hàng</div>
                <div>In Hóa Đơn</div>
                </div>
            </div>
        </>
        )
    )
}

export default Index;