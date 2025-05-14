import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ImageWithFallBack from '@/common/components/ImageWithFallBack';
import { UserInfoContext, useUserInfoContext } from '@/context/UserInforProvider';
import AddressForm from '@/modules/address/components/AddressForm';
import { Address } from '@/modules/address/model/Address';
import { AddressDetailVm } from '@/modules/address/model/AddressDetail';
import { CountryVm } from '@/modules/country/model/CountryVm';
import { getAllCountries, getStateOrProvinces } from '@/modules/country/service/CountryService';
import { Districts } from '@/modules/districts/model/Districts';
import { getDistrictsList } from '@/modules/districts/services/Districts';
import { getAddressDefault } from '@/modules/profile/service/ProfileService';
import { StateOrProvince } from '@/modules/stateorprovince/model/StateOrProvince';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

enum Tabs {
  Tab1 = 'Tab1',
  Tab2 = 'Tab2',
  Tab3 = 'Tab3',
}

type Cart = {
  id: number;
  productName: string;
  quantity: number;
  totalPrice: number;
  status: string;
};

const Profile: NextPage = () => {
  const router = useRouter();

  const { firstname, email, lastname } = useUserInfoContext();

  const [adddressDefault, setAddressDefault] = useState<AddressDetailVm>();

  const [coutries, setCountries] = useState<CountryVm[]>();
  const [stateOrProvinces, setStateOrProvinces] = useState<StateOrProvince[]>();
  const [districts, setDistricts] = useState<Districts[]>();

  const [selectedCountryVm, setSelectedCountry] = useState<CountryVm>();
  const [selectedDistrict, setSelectedDistrict] = useState<Districts>();
  const [selectedStateOrProvinces, setSelectedStateOrProvinces] = useState<StateOrProvince>();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { register
    , handleSubmit: handleSubmitUpdateAddress
    , setValue
    , formState: { errors } } = useForm<Address>();

  const [activeTab, setActiveTab] = useState<Tabs.Tab1 | Tabs.Tab2 | Tabs.Tab3>(Tabs.Tab1);

  const [orderStatus, setOrderStatus] = useState("pending");

  const [carts, setCarts] = useState<Cart[]>();

  const handleActiveTabs = (tab: Tabs) => {
    setActiveTab(tab);
  }

  const onSubmitUpdateAddress: SubmitHandler<Address> = async (data) => {
    let addressUpdate = {

    }
  }

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)
    setOrderStatus(event.target.value);
  }

  /*Example Data to Show */
  const dummyCarts: Cart[] = [
    { id: 1, productName: 'Gạo ST25', quantity: 2, totalPrice: 40000, status: 'pending' },
    { id: 2, productName: 'Gạo Lứt', quantity: 1, totalPrice: 20000, status: 'shipping' },
    { id: 3, productName: 'Gạo Nhật', quantity: 3, totalPrice: 60000, status: 'cancelled' },
  ];

  useEffect(() => {
    getAddressDefault().then((res) => {
      setAddressDefault(res);
    }).catch((error) => console.error(error));
  }, [])

  useEffect(() => {
    if (adddressDefault) {
      getStateOrProvinces(Number(adddressDefault?.countryId))
        .then((res) => {
          setStateOrProvinces(res)
        }).catch((error) => console.error(error));
      getAllCountries().then((res) => setCountries(res))
        .catch((error) => console.error(error));
      getDistrictsList().then((res) => setDistricts(res))
        .catch((error) => console.error(error));
    }
  }, [adddressDefault])

  useEffect(() => {
    if (coutries && adddressDefault) {
      const activeCountries = coutries.find((item) => item.id === adddressDefault?.countryId);
      setSelectedCountry(activeCountries);
    }

    if (stateOrProvinces && adddressDefault) {
      const active = stateOrProvinces.find((item) => item.id === adddressDefault?.stateOrProvinceId);
      setSelectedStateOrProvinces(active);
    }

    if (districts && adddressDefault) {
      const activeDistrict = districts.find((item) => item.id === adddressDefault?.districtId);
      setSelectedDistrict(activeDistrict);
    }

  }, [coutries, stateOrProvinces, districts, adddressDefault]);

  useEffect(() => {
    const filter = dummyCarts.filter((cartStatus) => cartStatus.status === orderStatus);
    setCarts(filter)
  })

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12">
        <div className="col-span-2 py-8">
          <ImageWithFallBack
            src='abaa'
            alt={adddressDefault ? adddressDefault.contactName : 'Error name'}
            className="rounded-full border-gray-300 border-2 w-32 h-32 object-cover mx-auto"
          />
        </div>
        {activeTab === Tabs.Tab1 && (

          <div className="col-span-8 px-5 gap-3">
            <div className="gap-3 flex-col flex">
              <div className="flex py-3">
                <label className="text-center w-full mx-auto font-bold text-gray-700 text-lg">Thông tin cơ bản</label>
              </div>
              <div className="flex w-full gap-3 items-center">
                <label className="font-bold text-sm w-[30%] text-gray-700">Tên người dùng: </label>
                <h3 className="w-[70%] font-bold text-sm text-gray-700">{firstname} {lastname}</h3>
              </div>
              <div className="flex w-full gap-3 items-center">
                <label className="font-bold text-sm w-[30%] text-gray-700">Email: </label>
                <h3 className="w-[70%] font-bold text-sm text-gray-700">{email}</h3>
              </div>
            </div>

            <div className="w-full py-3">
              <div className="flex">
                <label className="text-center w-full mx-auto font-bold text-gray-700 text-lg">Địa chỉ mặc định</label>
              </div>
            </div>
            <div className="gap-3 flex-col flex">
              <div className="flex w-full gap-3 items-center">
                <label className="font-bold text-sm w-[30%] text-gray-700">Tên người nhận: </label>
                <h3 className="w-[70%] font-bold text-sm text-gray-700">{adddressDefault?.contactName}</h3>
              </div>
              <div className="flex w-full gap-3 items-center">
                <label className="font-bold text-sm w-[30%] text-gray-700">Số điện thoại: </label>
                <h3 className="w-[70%] font-bold text-sm text-gray-700">{adddressDefault?.phone}</h3>
              </div>
              <div className="flex w-full gap-3 items-center">
                <label className="font-bold text-sm w-[30%] text-gray-700">Địa chỉ cụ thể 1: </label>
                <h3 className="w-[70%] font-bold text-sm text-gray-700">{adddressDefault?.addressLine1}</h3>
              </div>
              <div className="flex w-full gap-3 items-center">
                <label className="font-bold text-sm w-[30%] text-gray-700">Địa chỉ cụ thể 2: </label>
                <h3 className="w-[70%] font-bold text-sm text-gray-700">{adddressDefault?.addressLine2}</h3>
              </div>
              <div className="flex w-full gap-3 items-center">
                <label className="font-bold text-sm w-[30%] text-gray-700">Quận/Huyện: </label>
                <h3 className="w-[70%] font-bold text-sm text-gray-700">{selectedDistrict?.name}</h3>
              </div>
              <div className="flex w-full gap-3 items-center">
                <label className="font-bold text-sm w-[30%] text-gray-700">Tỉnh/Thành phố: </label>
                <h3 className="w-[70%] font-bold text-sm text-gray-700">{selectedStateOrProvinces?.name}</h3>
              </div>
              <div className="flex w-full gap-3 items-center">
                <label className="font-bold text-sm w-[30%] text-gray-700">Quốc gia: </label>
                <h3 className="w-[70%] font-bold text-sm text-gray-700">{selectedCountryVm?.name}</h3>
              </div>
            </div>
          </div>
        )}

        {activeTab === Tabs.Tab2 && (
          <div className="col-span-8 px-5 gap-3">
            <h2 className="text-center font-bold mx-3">Sản phẩm đã xem gần đây</h2>
          </div>
        )}

        {activeTab === Tabs.Tab3 && (
          <div className="col-span-8 px-5 gap-3 ">
            <div className="flex w-[100%]">
              <h2 className="text-center font-bold mx-3 w-[70%]">Đơn đã mua</h2>

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
                  <option value="peding" selected>Chờ xác nhận</option>
                  <option value="picking">Chờ lấy hàng</option>
                  <option value="shipping">Đang giao</option>
                  <option value="delivered">Đã giao</option>
                  <option value="returned">Trả hàng</option>
                  <option value="cancelled">Đã Hủy</option>
                </select>
              </form>
            </div>
            {carts && carts.length === 0 ? (
              <div className="text-gray-500">Không có đơn hàng ở trạng thái này.</div>
            ) : (
              <table className="min-w-full table-auto border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Tên sản phẩm</th>
                    <th className="border px-4 py-2">Số lượng</th>
                    <th className="border px-4 py-2">Tổng giá</th>
                    <th className="border px-4 py-2">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {carts &&  carts.map((cart) => (
                    <tr key={cart.id}>
                      <td className="border px-4 py-2">{cart.id}</td>
                      <td className="border px-4 py-2">{cart.productName}</td>
                      <td className="border px-4 py-2">{cart.quantity}</td>
                      <td className="border px-4 py-2">{cart.totalPrice.toLocaleString()} đ</td>
                      <td className="border px-4 py-2">{cart.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div></div>
          </div>
        )}

        <div className="col-span-2 py-3 gap-3 flex flex-col">
          <button
            className={`font-bold p-2 rounded-md ${activeTab === Tabs.Tab1 ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
            onClick={() => handleActiveTabs(Tabs.Tab1)}
          >
            Thông tin cơ bản
          </button>
          <button
            className={`font-bold p-2 rounded-md ${activeTab === Tabs.Tab2 ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
            onClick={() => handleActiveTabs(Tabs.Tab2)}
          >
            Sản phẩm đã xem gần đây
          </button>
          <button
            className={`font-bold p-2 rounded-md ${activeTab === Tabs.Tab3 ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
            onClick={() => handleActiveTabs(Tabs.Tab3)}
          >
            Đơn hàng
          </button>
        </div>
      </div>

      {isModalOpen && (
        <AddressForm
          titleModal='Đổi địa chỉ'
          setValue={setValue}
          errors={errors}
          address={adddressDefault}
          isDisplay={isModalOpen}
          buttonText='Đổi địa chỉ'
          onClose={() => setIsModalOpen(!isModalOpen)}
          register={register}
          handleSubmit={handleSubmitUpdateAddress(onSubmitUpdateAddress)}
        />
      )}

    </div>
  );
};

export default Profile;
