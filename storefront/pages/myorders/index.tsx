import { OrderVm } from '@/modules/orders/model/OrderVm'
import { getListOrderByCreatedBy } from '@/modules/orders/services/OrdersService'
import { error } from 'console';
import React, { useEffect, useState } from 'react'

export default function myorders() {
  const[orderVm,setOrderVm] = useState<OrderVm>();

  useEffect(() => {
    getListOrderByCreatedBy() 
    .then((res) => setOrderVm(res))
    .catch((error) => console.error(error));
  },[])
  
  return (
    <>
      <div className="container mx-auto">
          <h2 className="text-center font-bold">Danh sách đơn hàng</h2>
          <div>
              <div className="flex">
                <div>Order</div>
                <div>
                  


                </div>
              </div>

          </div>

      </div>
    </>
  )
}
