import { Address } from '@/modules/address/model/Address';
import { AddressDetailVm } from '@/modules/address/model/AddressDetail';
import { CountryVm } from '@/modules/country/model/CountryVm';
import { getAllCoutries, getDistricts, getStateOrProvinces } from '@/modules/country/service/CountryService';
import { Districts } from '@/modules/districts/model/Districts';
import { OrderItemVm } from '@/modules/orders/model/OrderItemVm';
import { OrderVm } from '@/modules/orders/model/OrderVm'
import { getListOrderByCreatedBy, getOrderById } from '@/modules/orders/services/OrdersService'
import { StateOrProvince } from '@/modules/stateorprovince/model/StateOrProvince';
import { error } from 'console';
import React, { useEffect, useState } from 'react'
import { CheckCircle, Loader, Truck, XCircle} from 'lucide-react'

const deliveryStatusTranslations = {
  PREPARING: "Đang chuẩn bị",
  DELIVERING: "Đang giao hàng",
  DELIVERED: "Đã giao hàng",
  CANCELLED: "Đã hủy đơn",
};

const deliveryStatusIcon = {
  PREPARING: <Loader className="w-5 h-5 animate-spin text-yellow-500" />,
  DELIVERING: <Truck className="w-5 h-5 text-blue-500" />,
  DELIVERED: <CheckCircle className="w-5 h-5 text-green-500" />,
  CANCELLED: <XCircle className="w-5 h-5 text-red-500" />,

}

export default function myorders() {
  const [orderVm, setOrderVm] = useState<OrderVm[]>();
  const [listCoutries, setListCountries] = useState<CountryVm[]>();
  const [listStateOrProvince, setListStateOrProvince] = useState<StateOrProvince[]>();
  const [listDistricts, setListDistricts] = useState<Districts[]>();
  const [shippingAddressVm, setShippingAddressVm] = useState<AddressDetailVm>();
  const [billingAddressVm, seBillingAddressVm] = useState<AddressDetailVm>();
  const [isDisplay, setisDisplay] = useState<Boolean>(false);
  const [orderModalVm, setOrderModalVm] = useState<OrderVm>();
  const [orderItemModalVm, setOrderItemModalVm] = useState<OrderItemVm[]>();

  useEffect(() => {
    getListOrderByCreatedBy()
      .then((res) => {
        setOrderVm(res)
      })
      .catch((error) => console.error(error));
  }, [orderVm])

  useEffect(() => {
    if (orderVm) {
      getAllCoutries().then((res) =>
        setListCountries(res)
      );
    }
  }, [])

  useEffect(() => {
    if (orderVm) {
      orderVm.map((item) => {

        getStateOrProvinces(item.billingAddressVm.countryId).then((res) => {
          setListStateOrProvince(res);
        });
        getDistricts(item.billingAddressVm.stateOrProvinceId).then((res) => {
          setListDistricts(res);
        });
      })
    }
  }, []);

  const getStateOrProvincesName = (countryId: number) => {
    const name = listStateOrProvince?.find((item) => item.countryId === countryId);
    return name ? name.name : "Unknow Name State";

  }
  const getDistrictsName = (stateOrProvinceId: number) => {
    const name = listDistricts?.find((item) => item.stateProvinceId === stateOrProvinceId);
    return name ? name.name : "Unknow Name District";

  }
  const handleModalOrderDetail = (id: number) => {
    getOrderById(id).then((res) => {
      setOrderModalVm(res);
    }).catch((error) => console.error(error));
  }
  // Define the steps => Render Steps with active Check => use it inside the order render
  


  return (
    <>
      <div className="container mx-auto">
        <h2 className="text-center font-bold">Danh sách đơn hàng</h2>
        {orderVm && orderVm.map((item, index) => (
          <div key={index}>
            <div className="flex flex-col w-[70%] mx-auto mt-5 gap-3" onClick={() => setisDisplay(!isDisplay)}>

              <>
                <div className="mx-auto"
                  onClick={() => handleModalOrderDetail(item.id)}
                >
                  <div className="flex justify-between">
                    <div>
                      ID Đơn hàng: {item.id}
                    </div>
                    <div>Trạng thái đơn hàng : {deliveryStatusTranslations[item.deliveryStatus]}</div>
                  </div>
                  <div>Địa chỉ giao hàng : {item.shippingAddressVm.addressLine1}, {item.shippingAddressVm.addressLine2},
                    {getStateOrProvincesName(item.shippingAddressVm.stateOrProvinceId)},
                    {getDistrictsName(item.shippingAddressVm.districtId)}

                  </div>
                  <div>Địa chỉ thanh toán : {item.billingAddressVm.addressLine1}, {item.billingAddressVm.addressLine2},
                    {getStateOrProvincesName(item.billingAddressVm.stateOrProvinceId)},
                    {getDistrictsName(item.billingAddressVm.districtId)}

                  </div>
                  {Array.from(item.orderItemVms).map((item, index) => (
                    <div key={index}>
                      <>
                        {item.productId}
                      </>
                    </div>
                  ))}
                </div>
                <div>
                </div >
              </>


            </div>

          </div>
        ))}

        {isDisplay && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={() => setisDisplay(!isDisplay)}>
              <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
               {orderModalVm &&  (
                <div>
                  {orderModalVm.deliveryStatus === 'PREPARING'}
                
                <div>{deliveryStatusIcon[orderModalVm.deliveryStatus]}</div>
                <div>{orderModalVm.deliveryStatus === 'PREPARING'}</div>
                
                
                </div>


               )}
               
                {orderModalVm ? (
                  <div>
                    
                  </div>
                ) : (
                  <p>Có lỗi với đơn hàng</p>
                )}
              
              </div>
            </div>
          </>
        )}

      </div>
    </>
  )
}
