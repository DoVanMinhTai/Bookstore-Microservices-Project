import ImageWithFallBack from '@/common/components/ImageWithFallBack';
import { CartItem } from '@/modules/cart/components/CartItem';
import { CartItemGetDetailVms } from '@/modules/cart/model/CartItemGetVm';
import { getProductById } from '@/modules/catalog/services/ProductServices';
import { ProductThumbnail } from '@/modules/homepage/models/ProductThumbnail';
import { OrderVm } from '@/modules/orders/model/OrderVm';
import { getOrderById } from '@/modules/orders/services/OrdersService';
import { error } from 'console';
import { flightRouterStateSchema } from 'next/dist/server/app-render/types';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

type Props = {}

const index = (props: Props) => {
    const router = useRouter();
    const { id } = router.query;
    const [order, setOrder] = useState<OrderVm | undefined>();
    const [products, setProducts] = useState<ProductThumbnail[]>();
    const [src, setSrc] = useState<string>();
    // const [cartItems, setCartItem] = useState<CartItemGetDetailVms[]>();
    useEffect(() => {
        if (id) {
            getOrderById(Number(id)).then((res) => setOrder(res)).catch((error) => console.error(error));
            console.log('12347868',order);
            


        }
    }, [id])

    useEffect(() => {
        if (order) {
            getProductById(order?.orderItemVm ? Array.from(order?.orderItemVm).map(item => item.productId) : [])
                .then((res) => setProducts(res))
                .catch((error) => console.error(error));
        }
    }, [order]);

    const mergeOrderWithProduct = order?.orderItemVm
        ? Array.from(order.orderItemVm).map((orderItem) => ({
            ...order,
            ...orderItem,
            thumbnailUrl: products?.find((product) => product.id === orderItem.productId)?.thumbnailUrl
        }))
        : [];

    useEffect(() => {
        console.log('123',products);
        
    },[order])

    return (
        order && (<>
            <div className="container mx-auto ">
                <div className="flex  justify-center w-full  ">
                    <div className="flex flex-col  w-full">
                        <div className="flex justify-center"></div>
                        <div className="flex justify-center">Cảm ơn bạn</div>
                        <div className="flex justify-center">Chúng tôi đã nhận được đơn hàng của bạn và sẽ giao trong khoảng 5- 7 ngày </div>
                    </div>
                    <div className="flex w-full">
                        <div>
                            <div className="flex">
                                <label htmlFor=""> Order Summary</label>
                                <div>{order.numberItem}</div>

                            </div>
                            {products?.map((item) => (
                                
                                <ImageWithFallBack src={item.thumbnailUrl} alt={item.name} />
                            ))}
                        </div>

                    </div>
                   
                </div>
            </div>
        </>
        )
    )
}

export default index;