import { OrderItemVm } from '@/modules/orders/model/OrderItemVm';
import { OrderVm } from '@/modules/orders/model/OrderVm'
import { getOrdersByOrderState } from '@/modules/orders/services/OrdersService'
import React, { useEffect, useState } from 'react'

export default function Myorders() {
  const [orderVm, setOrderVm] = useState<OrderVm[]>();
  const [orderStatus, setOrderStatus] = useState("pending");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOrderItems, setSelectedOrderItems] = useState<OrderItemVm[] | null>(null);
  
  useEffect(() => {
    getOrdersByOrderState(orderStatus).then((res) => setOrderVm(res))
      .catch((error) => console.error(error));
  }, [orderStatus]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderStatus(event.target.value);
  }

  useEffect(() => {
    const filter = orderVm ? orderVm.filter((cartStatus) => cartStatus.orderStatus === orderStatus) : null;
    if (filter !== null) {
      setOrderVm(filter)
    }
  }, [orderStatus, orderVm])

  return (
    <>
      <div className="container mx-auto px-5 gap-3 ">
        <div className="flex w-[100%] mb-5">
          <div className="w-[70%] m-auto">
            <h2 className="text-center font-bold  mx-3 ">Đơn hàng của bạn</h2>
          </div>
          <form className="max-w-sm mx-auto">
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                focus:border-blue-500 block w-full p-2.5
                 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400 dark:text-white
                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="ordersStatus"
              value={orderStatus}
              onChange={handleStatusChange}
            >
              <option value="pending">Chờ xác nhận</option>
              <option value="accepted">Đã xác nhận</option>
              <option value="pending_payment">Chờ thanh toán</option>
              <option value="paid">Đã thanh toán</option>
              <option value="shipping">Đang giao</option>
              <option value="completed">Hoàn thành</option>
              <option value="refund">Hoàn tiền</option>
              <option value="cancelled">Đã Hủy</option>
              <option value="reject">Từ chối</option>
            </select>
          </form>
        </div>
        {orderVm && orderVm.length === 0 ? (
          <div className="text-gray-500">Không có đơn hàng ở trạng thái này.</div>
        ) : (
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Tổng giá</th>
                <th className="border px-4 py-2">Trạng thái</th>
                <th className="border px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {orderVm && orderVm.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.id}</td>
                  <td className="border px-4 py-2">{item.totalPrice.toLocaleString()}</td>
                  <td className="border px-4 py-2">{item.orderStatus}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => {
                        setSelectedOrderItems(Array.from(item.orderItemVms || []));
                        setIsModalOpen(!isModalOpen);
                      }}
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
      {isModalOpen && selectedOrderItems && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-2xl">
            <h2 className="text-lg font-bold mb-4">Chi tiết sản phẩm</h2>
            <table className="min-w-full table-auto border border-gray-200">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Tên sản phẩm</th>
                  <th className="border px-4 py-2">Số lượng</th>
                  <th className="border px-4 py-2">Giá</th>
                  <th className="border px-4 py-2">Giảm giá</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrderItems.map((item) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-2">{item.productName}</td>
                    <td className="border px-4 py-2">{item.quantity}</td>
                    <td className="border px-4 py-2">{item.productPrice.toLocaleString()} đ</td>
                    <td className="border px-4 py-2">{item.discountAmount?.toLocaleString()} đ</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  )
}
