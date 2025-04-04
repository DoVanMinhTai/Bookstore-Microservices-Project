import ImageWithFallBack from '@/common/components/ImageWithFallBack';
import { UserInfoContext, useUserInfoContext } from '@/context/UserInforProvider';
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
  const [stateOrProvincesList, setStateOrProvincesList] = useState<StateOrProvince[]>();
  const [stateOrProvinces, setStateOrProvinces] = useState<StateOrProvince>();
  const [allCountries, setAllCountries] = useState<CountryVm[]>();
  const [countryVm, setCountryVm] = useState<CountryVm>();
  const [districtList, setDistrictList] = useState<Districts[]>();
  const [district, setDistrict] = useState<Districts>();


  useEffect(() => {
    getAddressDefault().then((res) => {
      setAddressDefault(res);
    }).catch((error) => console.error(error));
  }, [])

  useEffect(() => {
    if (adddressDefault) {
      getStateOrProvinces(Number(adddressDefault?.countryId))
        .then((res) => {
          setStateOrProvincesList(res)
        }).catch((error) => console.error(error));
      getAllCoutries().then((res) => setAllCountries(res))
        .catch((error) => console.error(error));
      getDistrictsList().then((res) => setDistrictList(res))
        .catch((error) => console.error(error));
    }
  }, [adddressDefault])

  useEffect(() => {
    console.log('activeallcountries', allCountries);

    if (allCountries && adddressDefault) {
      const activeCountries = allCountries.find((item) => item.id === adddressDefault?.countryId);
      setCountryVm(activeCountries);
    }

    if (stateOrProvincesList && adddressDefault) {
      const active = stateOrProvincesList.find((item) => item.id === adddressDefault?.stateOrProvinceId);
      console.log('active', active);

      setStateOrProvinces(active);
    }

    if (districtList && adddressDefault) {
      const activeDistrict = districtList.find((item) => item.id === adddressDefault?.districtId);
      setDistrict(activeDistrict);
    }

  }, [allCountries, stateOrProvincesList, districtList, adddressDefault]);

  const handleListAddress = () => {

  }
  return (
    <div className="container mx-auto"
    >
      <div className="grid grid-cols-9">
        <div className="col-span-2 py-8  ">
          <ImageWithFallBack src='abaa' alt={adddressDefault ? adddressDefault.contactName : 'Error name'} className="rounded-full  border-gray-300 border-2 w-32 h-32 object-cover mx-auto" />
        </div>
        <div className=" px-5 gap-3 col-span-3 ">
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
              <h3 className="w-[70%] font-bold text-sm text-gray-700">{district?.name}</h3>
            </div>
            <div className="flex w-full gap-3 items-center">
              <label htmlFor="" className="font-bold text-sm w-[30%] text-gray-700">Tỉnh/Thành phố: </label>
              <h3 className="w-[70%] font-bold text-sm text-gray-700">{stateOrProvinces?.name}</h3>
            </div>
            <div className="flex w-full gap-3 items-center">
              <label htmlFor="" className="font-bold text-sm w-[30%] text-gray-700">Quốc gia: </label>
              <h3 className="w-[70%] font-bold text-sm text-gray-700">{countryVm?.name}</h3>
            </div>
            <div className="flex justify-end">
                <button className="p-2 border rounded-md bg-blue-400 font-bold text-sm" onClick={handleListAddress}>Đổi địa chỉ</button>
            </div>
          </div>
        </div>
        <div className="col-span-4">

        </div>
      </div>


    </div>
  );
};

export default Profile;
