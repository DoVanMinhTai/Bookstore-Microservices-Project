import { Address } from '@/modules/address/model/Address';
import { AddressDetailVm } from '@/modules/address/model/AddressDetail';
import { CountryVm } from '@/modules/country/model/CountryVm';
import { getAllCoutries, getDistricts, getStateOrProvinces } from '@/modules/country/service/CountryService';
import { Districts } from '@/modules/districts/model/Districts';
import { OrderVm } from '@/modules/orders/model/OrderVm'
import { getListOrderByCreatedBy } from '@/modules/orders/services/OrdersService'
import { StateOrProvince } from '@/modules/stateorprovince/model/StateOrProvince';
import { error } from 'console';
import React, { useEffect, useState } from 'react'


const deliveryStatusTranslations = {
  PREPARING: "Đang chuẩn bị",
  DELIVERING: "Đang giao hàng",
  DELIVERED: "Đã giao hàng",
  CANCELLED: "Đã hủy đơn",
};

export default function myorders() {
  const [orderVm, setOrderVm] = useState<OrderVm[]>();
  const [listCoutries, setListCountries] = useState<CountryVm[]>();
  const [listStateOrProvince, setListStateOrProvince] = useState<StateOrProvince[]>();
  const [listDistricts, setListDistricts] = useState<Districts[]>();
  const [shippingAddressVm, setShippingAddressVm] = useState<AddressDetailVm>();
  const [billingAddressVm, seBillingAddressVm] = useState<AddressDetailVm>();

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



  return (
    <>
      <div className="container mx-auto">
        <h2 className="text-center font-bold">Danh sách đơn hàng</h2>
        <div>
          {orderVm && orderVm.map((item, index) => (
            <div className="flex flex-col w-[70%] mx-auto mt-5 gap-3" key={index}>

              <>
                <div className="mx-auto"
                >
                  <div className="flex justify-between">
                    <div>
                      Đơn hàng chi tiết: #{item.id}
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
                </div>
                <div>
                </div >
              </>


            </div>
          ))}

        </div>

      </div>
    </>
  )
}
