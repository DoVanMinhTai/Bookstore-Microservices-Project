import ImageWithFallBack from '@/common/components/ImageWithFallBack';
import { UserInfoContext, useUserInfoContext } from '@/context/UserInforProvider';
import AddressForm from '@/modules/address/components/AddressForm';
import { AddressDetailVm } from '@/modules/address/model/AddressDetail';
import { CountryVm } from '@/modules/country/model/CountryVm';
import { getAllCoutries, getStateOrProvinces } from '@/modules/country/service/CountryService';
import { Districts } from '@/modules/districts/model/Districts';
import { getDistrictsList } from '@/modules/districts/services/Districts';
import { getAddressDefault } from '@/modules/profile/service/ProfileService';
import { StateOrProvince } from '@/modules/stateorprovince/model/StateOrProvince';
import { error } from 'console';
import React, { useEffect, useState } from 'react';

type Props = {
  title?: string;
};

const Profile = () => {
  const { firstname, email, lastname } = useUserInfoContext();

  const [adddressDefault, setAddressDefault] = useState<AddressDetailVm>();

  const [coutries, setCountries] = useState<CountryVm[]>();
  const [stateOrProvinces, setStateOrProvinces] = useState<StateOrProvince[]>();
  const [districts, setDistricts] = useState<Districts[]>();

  const [selectedCountryVm, setSelectedCountry] = useState<CountryVm>();
  const [selectedDistrict, setSelectedDistrict] = useState<Districts>();
  const [selectedStateOrProvinces, setSelectedStateOrProvinces] = useState<StateOrProvince>();

  const [isModalOpen,setIsModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState('Tab1');

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
      getAllCoutries().then((res) => setCountries(res))
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

  const handleChangeAddress = () => {
    setIsModalOpen(!isModalOpen);
  }

  const handleActiveTabs = (tab: string) => {
    setActiveTab(tab);
  }

  return (
    <div className="container mx-auto">
      {activeTab === 'Tab1' &&
        <div className="grid grid-cols-9">
          <>       <div className="col-span-2 py-8  ">
            <ImageWithFallBack src='abaa' alt={adddressDefault ? adddressDefault.contactName : 'Error name'} className="rounded-full  border-gray-300 border-2 w-32 h-32 object-cover mx-auto" />
          </div>
            <div className=" px-5 gap-3 col-span-5 ">
              <div className="gap-3 flex-col flex">

                <div className="flex py-3">
                  <label htmlFor="" className="text-center w-full mx-auto font-bold text-gray-700 text-lg">Thông tin cơ bản</label>
                </div>
                <div className="flex w-full gap-3 items-center">
                  <label htmlFor="" className="font-bold text-sm w-[30%] text-gray-700">Tên người dùng: </label>
                  <h3 className="w-[70%] font-bold text-sm text-gray-700">{firstname} {lastname}</h3>
                </div>
                <div className="flex w-full gap-3 items-center">
                  <label htmlFor="" className="font-bold text-sm w-[30%] text-gray-700">Email: </label>
                  <h3 className="w-[70%] font-bold text-sm text-gray-700">{email}</h3>
                </div>
              </div>
              <div className="w-full py-3">
                <div className="flex">
                  <label htmlFor="" className="text-center w-full mx-auto font-bold text-gray-700 text-lg">Địa chỉ mặc định</label>
                </div>
              </div>
              <div className="gap-3 flex-col flex">
                <div className="flex w-full gap-3 items-center">
                  <label htmlFor="" className="font-bold text-sm w-[30%] text-gray-700">Tên người nhận: </label>
                  <h3 className="w-[70%] font-bold text-sm text-gray-700">{adddressDefault?.contactName}</h3>
                </div>
                <div className="flex w-full gap-3 items-center">
                  <label htmlFor="" className="font-bold text-sm w-[30%] text-gray-700">Số điện thoại: </label>
                  <h3 className="w-[70%] font-bold text-sm text-gray-700">{adddressDefault?.phone}</h3>
                </div>
                <div className="flex w-full gap-3 items-center">
                  <label htmlFor="" className="font-bold text-sm w-[30%] text-gray-700">Địa chỉ cụ thể 1: </label>
                  <h3 className="w-[70%] font-bold text-sm text-gray-700">{adddressDefault?.addressLine1}</h3>
                </div>
                <div className="flex w-full gap-3 items-center">
                  <label htmlFor="" className="font-bold text-sm w-[30%] text-gray-700">Địa chỉ cụ thể 2: </label>
                  <h3 className="w-[70%] font-bold text-sm text-gray-700">{adddressDefault?.addressLine2}</h3>
                </div>
                <div className="flex w-full gap-3 items-center">
                  <label htmlFor="" className="font-bold text-sm w-[30%] text-gray-700">Quận/Huyện: </label>
                  <h3 className="w-[70%] font-bold text-sm text-gray-700">{selectedDistrict?.name}</h3>
                </div>
                <div className="flex w-full gap-3 items-center">
                  <label htmlFor="" className="font-bold text-sm w-[30%] text-gray-700">Tỉnh/Thành phố: </label>
                  <h3 className="w-[70%] font-bold text-sm text-gray-700">{selectedStateOrProvinces?.name}</h3>
                </div>
                <div className="flex w-full gap-3 items-center">
                  <label htmlFor="" className="font-bold text-sm w-[30%] text-gray-700">Quốc gia: </label>
                  <h3 className="w-[70%] font-bold text-sm text-gray-700">{selectedCountryVm?.name}</h3>
                </div>
                <div className="flex justify-end">
                  <button className="p-2 border rounded-md bg-blue-400 font-bold text-sm" onClick={() => handleChangeAddress()}>Đổi địa chỉ</button>
                </div>
              </div>
            </div>

          </>
          <div className="col-span-2 gap-3 py-3 flex flex-col">
            <button className={activeTab ? "font-bold  text-gray-700 bg-blue-500 rounded-md" : "font-bold "} onClick={() => handleActiveTabs('Tab1')}>
              Thông tin cơ bản
            </button>
            <button className="font-bold  text-gray-700" onClick={() => handleActiveTabs('Tab2')}>
              Sản phẩm đã xem gần đây
            </button>
          </div>
        </div>


      }
 {/* handleSubmit: () => {};
    register: UseFormRegister<Address>;
    setValue: UseFormSetValue<Address>;
    errors: FieldErrorsImpl<Address>;
    address: Address | undefined;
    isDisplay?: boolean | true;
    buttonText?: string;
    onClose: () => void ;
    titleModal: string; */}
      {isModalOpen && <>
        <AddressForm 
          titleModal=''
          setValue={}
          errors={}
          address={}
          isDisplay
          buttonText=''
          onClose={}
        />
      </>}

      {activeTab === 'Tab2' && <>
        <div className=" container  mx-auto gap-3 grid grid-cols-9"
        >
          <div className="col-span-2 py-8  ">
          </div>
          <div className="col-span-5">
            <h2 className="text-center font-bold mx-3">Sản phẩm đã xem gần đây </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b text-left">ID</th>
                    <th className="px-4 py-2 border-b text-left">Tên Sản Phẩm</th>
                    <th className="px-4 py-2 border-b text-left">Gía</th>
                    <th className="px-4 py-2 border-b text-left">Xem Chi Tiết Sản Phẩm</th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b">1</td>
                    <td className="px-4 py-2 border-b">John Doe</td>
                    <td className="px-4 py-2 border-b">john.doe@example.com</td>
                    <td className="px-4 py-2 border-b">Admin</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
          <div className="col-span-2 py-3 gap-3 flex flex-col">
            <button className="font-bold text-gray-700" onClick={() => handleActiveTabs('Tab1')}>
              Thông tin cơ bản
            </button>
            <button className={activeTab ? "font-bold  text-gray-700 bg-blue-500 rounded-md" : "font-bold "} onClick={() => handleActiveTabs('Tab2')}>
              Sản phẩm đã xem gần đây
            </button>
          </div>

        </div>
      </>}

    </div>
  );
};

export default Profile;
