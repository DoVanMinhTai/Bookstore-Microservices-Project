import React, { useEffect, useState } from 'react'
import { Checkout } from '../model/Checkout'
import AddressForm from '@/modules/address/components/AddressForm'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Address } from '@/modules/address/model/Address';
import { createAddress } from '@/modules/address/service/Address';
import { AddressDetail } from '@/modules/address/model/AddressDetail';
import { getUserAddressList } from '@/modules/profile/service/ProfileService';
import { error } from 'console';
import { getAllCoutries, getDistricts } from '@/modules/country/service/CountryService';
import { Districts } from '@/modules/districts/model/Districts';
import { StateOrProvince } from '@/modules/stateorprovince/model/StateOrProvince';
import { getStateOrProvinces } from '@/modules/stateorprovince/services/StateOrProvince';
import { getDistrictsList } from '@/modules/districts/services/Districts';
import { CountryVm } from '@/modules/country/model/CountryVm';
type Props = {
    checkout: Checkout;
}


export default function CheckoutShippingInfo({ checkout }: Props) {
    const {
        handleSubmit: handleSubmitShippingAddress,
        register: handleRegisterShippingAddress,
        setValue: setValueRegisterShippingAddress,
        formState: { errors }
    } = useForm<Address>();
    const [address, setAddress] = useState<Address>();
    const [listAddress, setListAddress] = useState<AddressDetail[]>([]);
    const [listDistricts, setListDistricts] = useState<Districts[]>([]);
    const [liststateOrProvince, setListStateOrProvince] = useState<StateOrProvince[]>([]);
    const [listCountry, setCountry] = useState<CountryVm[]>([]);
    const [showModalShippingAddress, setShowModalShippingAddress] = useState<boolean>(false)
    const [showModalList, setShowModalList] = useState<boolean>(false);

    // step là sẽ tạo 1 hàm để submit
    //  fetch data tới api client để tạo địa chỉ
    const onHandleSubmitShippingAddress: SubmitHandler<Address> = async (data) => {


        const newAddress = await performAndFetch(data);
        let address;
        address = newAddress;
        setAddress(address);
        setShowModalShippingAddress(!showModalShippingAddress);
        showModalListAddress
        return address;
    }

    const performAndFetch = async (data: Address) => {
        console.log('data', data);
        const reponse = await createAddress(data);
        return reponse;
    }

    const onShowModalShippingAddress = () => {
        console.log(showModalShippingAddress);

        setShowModalShippingAddress(!showModalShippingAddress);
        setShowModalList(!showModalList)
    }
    const showModalListAddress = () => {

        setShowModalList(!showModalList);
    }

    const closeModal = () => {
        setShowModalList(!showModalList)
    }

    useEffect(() => {
        getUserAddressList()
            .then((res) => setListAddress(res))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        getAllCoutries()
            .then((res) => setCountry(res))
            .catch((error) => console.error(error));



        getDistrictsList()
            .then((res) => setListDistricts(res))
            .catch((error) => console.error(error))

        getStateOrProvinces()
            .then((res) => setListStateOrProvince(res))
            .catch((error) => console.error(error))
    }, []);

    const getDistrictsById = (districtId: number): Districts | undefined => {
        const district = listDistricts.find(d => d.id === districtId)
        return district;
    }

    const getStateOrProvinceById = (stateOrProvinceId: number): StateOrProvince | undefined => {
        const stateOrProvince = liststateOrProvince.find(d => d.id === stateOrProvinceId)
        return stateOrProvince;
    }

    const getCountryById = (countryId: number): CountryVm | undefined => {
        const country = listCountry.find(d => d.id === countryId);
        return country;
    }



    return (
        <>
            <div className="  p-5 gap-3 mt-5 ">
                <div className="font-bold  text-lg text-gray-700">

                    Thông tin giao hàng
                </div>
                <div className="mt-5 flex flex-col gap-5 w-full">
                    <div className="flex justify-between">
                        <div className="block text-sm font-medium text-gray-700">Email</div>
                        <label >
                            {checkout?.email}
                        </label>
                    </div>
                    <div className="flex justify-between">
                        <div className="block text-sm font-medium text-gray-700">Ghi chú</div>
                        <label >
                            {checkout?.note}
                        </label>
                    </div>
                    <div className="flex justify-between">
                        <div className="block text-sm font-medium text-gray-700">Mã giảm giá</div>
                        <label >
                            {checkout?.promotionCode}
                        </label>
                    </div>
                </div>

                <div className="flex justify-between mt-5">
                    <div className="block text-sm font-medium text-gray-700">Địa chỉ nhận hàng</div>
                    {/* <button className="" onClick={onShowModalShippingAddress}>Chọn địa chỉ</button> */}
                    <button className="" onClick={showModalListAddress} >Chọn địa chỉ</button>

                </div>
                <AddressForm
                    handleSubmit={handleSubmitShippingAddress(onHandleSubmitShippingAddress)}
                    register={handleRegisterShippingAddress}
                    setValue={setValueRegisterShippingAddress}
                    errors={errors}
                    address={address}
                    isDisplay={showModalShippingAddress}
                />
                <div className="border-2 mt-5   items-center justify-center p-5">
                    {address ? (<div className="flex gap-2">
                        <div >
                            <div>{checkout.email}</div>
                            <div>contact</div>

                        </div>
                        <div className="flex-grow flex justify-between col-span-2">
                            <div>Dia chi</div>
                            <button>Sửa</button>
                        </div>
                    </div>) : (<div className="w-full items-center text-center  text-sm  justify-center font-bold text-gray flex mx-auto">Bạn chưa thêm địa chỉ</div>)}



                </div>

                {showModalList && (

                    <div
                        onClick={() => setShowModalShippingAddress(!showModalShippingAddress)}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" >
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[700px]">
                            <h2 className="text-xl font-semibold mb-4">Danh sách địa chỉ</h2>

                            {listAddress.length > 0 ? (
         
                                <>
                                    {listAddress.map((item) => (
                                        <div className="p-5 border-2 ">
                                            <div className="flex ">
                                                <div className="flex-[1] flex items-center gap-2 p-0">
                                                    <div className="text-center font-bold text-sm text-gray-700">
                                                        {item.contactName}
                                                    </div>
                                                    <div className="text-center font-bold text-sm text-gray-700 ">
                                                        {item.phone}
                                                    </div>
                                                </div>
                                                <div className="flex-[2]  ">

                                                    <div className=" flex  gap-2">
                                                        <div className="">
                                                            {item.addressLine1},

                                                        </div>
                                                        <div className="">
                                                            {item.addressLine2},

                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <div className="">
                                                            {getDistrictsById(item.districtId)?.name},

                                                        </div>
                                                        <div className="">
                                                            {getStateOrProvinceById(item.stateOrProvinceId)?.name},

                                                        </div>
                                                        <div className="">
                                                            {getCountryById(item.countryId)?.name}

                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded-sm" />
                                                </div>
                                            </div>

                                        </div>
                                    )
                                    )}
                                    <div className="flex flex-col justify-end items-center">
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                            onClick={onShowModalShippingAddress}
                                        >
                                            Thêm địa chỉ
                                        </button>
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                            onClick={closeModal}
                                        >
                                            Đóng
                                        </button>
                                    </div>
                                </>


                            ) : (
                                <div className="flex flex-col items-center">
                                    <p className="text-gray-500 mb-4">Chưa có địa chỉ nào</p>
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        onClick={onShowModalShippingAddress}
                                    >
                                        Thêm địa chỉ
                                    </button>
                                </div>)}

                        </div>
                    </div>
                )}




            </div>

        </>
    )
}