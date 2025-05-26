import React, { useEffect, useState } from 'react'
import { Checkout } from '../model/Checkout'
import AddressForm from '@/modules/address/components/AddressForm'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Address } from '@/modules/address/model/Address';
import { createAddress, getAddressById, updateAddress } from '@/modules/address/service/Address';
import { AddressDetailVm } from '@/modules/address/model/AddressDetail';
import { getAddressBillingList, getAddressDefault, getUserAddressList } from '@/modules/profile/service/ProfileService';
import { error } from 'console';
import { getAllCountries, getDistricts } from '@/modules/country/service/CountryService';
import { Districts } from '@/modules/districts/model/Districts';
import { StateOrProvince } from '@/modules/stateorprovince/model/StateOrProvince';
import { getStateOrProvinces } from '@/modules/stateorprovince/services/StateOrProvince';
import { getDistrictsList } from '@/modules/districts/services/Districts';
import { CountryVm } from '@/modules/country/model/CountryVm';
import { AddressPostVm } from '@/modules/address/model/AddressPostVm';
type Props = {
    checkout: Checkout;
    handleAddress: (shipping: AddressDetailVm, billing: AddressDetailVm) => void
}


export default function CheckoutShippingInfo({ checkout, handleAddress }: Props) {
    const {
        handleSubmit: handleSubmitShippingAddress,
        register: handleRegisterShippingAddress,
        setValue: setValueRegisterShippingAddress,
        formState: { errors }
    } = useForm<Address>();

    const [address, setAddress] = useState<Address>();
    const [addressPostVm, setAddressPostVm] = useState<AddressPostVm>();
    const [selectedAddress, setSelectedAddress] = useState<AddressDetailVm>();
    const [selectedAddressBilling, setSelectedAddressBilling] = useState<AddressDetailVm | null>(null);
    const [listAddress, setListAddress] = useState<AddressDetailVm[]>([]);
    const [listAddressBilling, setListAddressBilling] = useState<AddressDetailVm[]>([])
    const [listDistricts, setListDistricts] = useState<Districts[]>([]);
    const [liststateOrProvince, setListStateOrProvince] = useState<StateOrProvince[]>([]);
    const [listCountry, setCountry] = useState<CountryVm[]>([]);
    const [showModalShippingAddress, setShowModalShippingAddress] = useState<boolean>(false)
    const [showModalUpdateShippingAddress, setShowModalUpdateShippingAddress] = useState<boolean>(false);
    const [showModalList, setShowModalList] = useState<boolean>(false);
    const [showModalListBilling, setShowModalListBilling] = useState<boolean>(false);



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
        const reponse = await createAddress(data);
        return reponse;
    }

    const onShowModalShippingAddress = () => {
        setShowModalShippingAddress(!showModalShippingAddress);
        setShowModalList(!showModalList)
    }
    const showModalListAddress = () => {
        setShowModalList(!showModalList);
    }

    const showModalListAddressBilling = () => {
        setShowModalListBilling(!showModalListBilling);
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
        getAddressBillingList()
            .then((res) => {
                setListAddressBilling(res)
            })
            .catch((error) => console.error(error))
    }, []);

    useEffect(() => {
        getAllCountries()
            .then((res) => setCountry(res))
            .catch((error) => console.error(error));



        getDistrictsList()
            .then((res) => setListDistricts(res))
            .catch((error) => console.error(error))

        getStateOrProvinces()
            .then((res) => setListStateOrProvince(res))
            .catch((error) => console.error(error))
    }, []);

    useEffect(() => {
        getAddressDefault().then((res) => setSelectedAddress(res)).catch((error) => console.error(error))
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

    const selectedAddressInList = (addressInList: AddressDetailVm) => {
        setSelectedAddress(addressInList);

    }

    const selectedAddressBillingInList = (item: AddressDetailVm) => {
        setSelectedAddressBilling(item);

    }

    useEffect(() => {
        if (selectedAddress && selectedAddressBilling) {
            handleAddress(selectedAddress, selectedAddressBilling);
        }
    }, [selectedAddress, selectedAddressBilling]);

    const showModalUpdateAddress = (address: Address) => {
        setAddress(address)
        setShowModalUpdateShippingAddress(!showModalUpdateShippingAddress);
        setValueRegisterShippingAddress("id", address.id);
        setValueRegisterShippingAddress("contactName", address.contactName);
        setValueRegisterShippingAddress("phone", address.phone);
        setValueRegisterShippingAddress("countryId", address.countryId)
        setValueRegisterShippingAddress("stateOrProvinceId", address.stateOrProvinceId)
        setValueRegisterShippingAddress("districtId", address.districtId)
        setValueRegisterShippingAddress("city", address.city)
        setValueRegisterShippingAddress("zipCode", address.zipCode)
        setValueRegisterShippingAddress("addressLine1", address.addressLine1);
        setValueRegisterShippingAddress("addressLine2", address.addressLine2)
    }

    const onClickHandleUpdateAddress: SubmitHandler<Address> = (data) => {
        let addressPostVm = {
            contactName: data.contactName,
            phone: data.phone,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
            city: data.city,
            zipCode: data.zipCode,
            districtId: data.districtId,
            stateOrProvinceId: data.stateOrProvinceId,
            countryId: data.countryId
        }
        const reponse = updateAddress(Number(data.id), addressPostVm);
        setShowModalUpdateShippingAddress(!showModalUpdateShippingAddress);
        return reponse;
    }

    return (
        <>
            <div className="  p-4 border rounded-lg shadow-md bg-white">
                <div className="font-bold  text-center text-lg text-gray-700">

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

                <div className=" mt-5 flex justify-between">
                    <div className="block text-sm font-medium text-gray-700">Địa chỉ nhận hàng</div>
                    <div className="mb-0">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-1 px-4  rounded-md" onClick={showModalListAddress} >Chọn địa chỉ khác</button>
                    </div>
                </div>

                <div className="p-4 mt-3 border rounded-lg shadow-md bg-white">
                    {selectedAddress ? (
                        <div className=" gap-2 ">
                            <div className="flex justify-between">
                                <div className="flex  gap-3">
                                    <span className="block text-sm font-medium text-gray-700 p-0">Tên Người Nhận:</span>
                                    <div className="block text-sm font-medium text-gray-700 p-0">{selectedAddress.contactName}</div>
                                </div>
                                <div className="flex gap-3">
                                    <span className="block text-sm font-medium text-gray-700 p-0">Số điện thoại:</span>
                                    <div className="block text-sm font-medium text-gray-700 p-0">{selectedAddress.phone}</div>
                                </div>
                            </div>
                            <div className=" ">
                                <div className="text-gray-700 flex justify-between gap-1 ">
                                    <div>
                                        <label htmlFor="" className="block text-sm font-medium text-gray-700 p-0">Địa chỉ: </label>
                                        <div className="flex gap-2">
                                            <div className="block text-sm font-medium text-gray-700">{selectedAddress.addressLine1},</div>
                                            <div className="block text-sm font-medium text-gray-700">{selectedAddress.addressLine2},</div>
                                            <div className="block text-sm font-medium text-gray-700">{getDistrictsById(selectedAddress.districtId)?.name},</div>
                                            <div className="block text-sm font-medium text-gray-700">{getStateOrProvinceById(selectedAddress.stateOrProvinceId)?.name},</div>
                                            <div className="block text-sm font-medium text-gray-700">{getCountryById(selectedAddress.countryId)?.name}</div>
                                        </div>
                                    </div>

                                </div>
                                {/* <button
                                        onClick={() => showModalUpdateAddress(selectedAddress)}
                                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                    >
                                        Cập nhật địa chỉ
                                    </button> */}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-sm font-bold text-gray-600">
                            Bạn chưa thêm địa chỉ
                        </div>
                    )}
                </div>

                <div className=" mt-5 flex justify-between">
                    <div className="block text-sm font-medium text-gray-700">Địa chỉ thanh toán</div>
                    <div className="mb-0">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-1 px-4  rounded-md" onClick={showModalListAddressBilling} >Chọn địa chỉ thanh toán</button>
                    </div>
                </div>

                <div className="p-4 mt-3 border rounded-lg shadow-md bg-white">
                    {selectedAddressBilling ? (
                        <div className=" gap-2 ">
                            <div className="flex justify-between">
                                <div className="flex  gap-3">
                                    <span className="block text-sm font-medium text-gray-700 p-0">Tên Người Nhận:</span>
                                    <div className="block text-sm font-medium text-gray-700 p-0">{selectedAddressBilling.contactName}</div>
                                </div>
                                <div className="flex gap-3">
                                    <span className="block text-sm font-medium text-gray-700 p-0">Số điện thoại:</span>
                                    <div className="block text-sm font-medium text-gray-700 p-0">{selectedAddressBilling.phone}</div>
                                </div>
                            </div>
                            <div className=" ">
                                <div className="text-gray-700 flex justify-between gap-1 ">
                                    <div>
                                        <label htmlFor="" className="block text-sm font-medium text-gray-700 p-0">Địa chỉ: </label>
                                        <div className="flex gap-2">
                                            <div className="block text-sm font-medium text-gray-700">{selectedAddressBilling.addressLine1},</div>
                                            <div className="block text-sm font-medium text-gray-700">{selectedAddressBilling.addressLine2},</div>
                                            <div className="block text-sm font-medium text-gray-700">{getDistrictsById(selectedAddressBilling.districtId)?.name},</div>
                                            <div className="block text-sm font-medium text-gray-700">{getStateOrProvinceById(selectedAddressBilling.stateOrProvinceId)?.name},</div>
                                            <div className="block text-sm font-medium text-gray-700">{getCountryById(selectedAddressBilling.countryId)?.name}</div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-sm font-bold text-gray-600">
                            Vui Lòng Chọn Địa Chỉ
                        </div>
                    )}
                </div>

                {showModalList && (

                    <div
                        onClick={() => setShowModalList(!showModalList)}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" >
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[700px]">
                            <div className="flex justify-between">

                                <h2 className="text-xl font-semibold mb-4">Danh sách địa chỉ</h2>
                                <button
                                    onClick={() => setShowModalList(!showModalList)}
                                    className=" text-gray-600 hover:text-gray-900"
                                >
                                    ✖
                                </button>
                            </div>

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
                                                            {item.id}
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
                                                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded-sm"
                                                        onClick={() => selectedAddressInList(item)}
                                                        checked={selectedAddress?.id === item.id} />
                                                </div>
                                            </div>

                                        </div>
                                    )
                                    )}
                                    {/* <div className="flex flex-col justify-end items-center">
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
                                    </div> */}
                                </>


                            ) : (
                                <div className="flex flex-col items-center">
                                    <p className="text-gray-500 mb-4">Chưa có địa chỉ nào</p>
                                    <button
                                        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        onClick={onShowModalShippingAddress}
                                    >
                                        Thêm địa chỉ
                                    </button>
                                </div>)}
                            <div className="flex justify-end">
                                <button
                                    className="bg-blue-700 text-white items-end mt-3 px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={onShowModalShippingAddress}
                                >
                                    Thêm địa chỉ
                                </button></div>
                        </div>
                    </div>
                )}



                {showModalListBilling && (

                    <div
                        onClick={() => setShowModalListBilling(!showModalListBilling)}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" >
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[700px]">
                            <div className="flex justify-between">

                                <h2 className="text-xl font-semibold mb-4">Danh sách địa chỉ thanh toán</h2>
                                <button
                                    onClick={() => setShowModalListBilling(!showModalListBilling)}
                                    className=" text-gray-600 hover:text-gray-900"
                                >
                                    ✖
                                </button>
                            </div>

                            {listAddressBilling.length > 0 ? (

                                <>
                                    {listAddressBilling.map((item) => (
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
                                                            {item.id}
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
                                                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded-sm"
                                                        onClick={() => selectedAddressBillingInList(item)}
                                                        checked={selectedAddressBilling?.id === item.id} />
                                                </div>
                                            </div>

                                        </div>
                                    )
                                    )}
                                </>


                            ) : (
                                <div className="flex flex-col items-center">
                                    <p className="text-gray-500 mb-4">Chưa có địa chỉ nào</p>
                                    <button
                                        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        onClick={onShowModalShippingAddress}
                                    >
                                        Thêm địa chỉ
                                    </button>
                                </div>)}
                            <div className="flex justify-end">
                                <button
                                    className="bg-blue-700 text-white items-end mt-3 px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={onShowModalShippingAddress}
                                >
                                    Thêm địa chỉ
                                </button></div>
                        </div>
                    </div>
                )}



            </div>
            <AddressForm
                handleSubmit={handleSubmitShippingAddress(onClickHandleUpdateAddress)}
                register={handleRegisterShippingAddress}
                setValue={setValueRegisterShippingAddress}
                errors={errors}
                address={address}
                isDisplay={showModalUpdateShippingAddress}
                buttonText='Cật nhật địa chỉ'
                onClose={() => { setShowModalUpdateShippingAddress(!showModalUpdateShippingAddress) }}
                titleModal='Cật nhật địa chỉ' />
            <AddressForm
                handleSubmit={handleSubmitShippingAddress(onHandleSubmitShippingAddress)}
                register={handleRegisterShippingAddress}
                setValue={setValueRegisterShippingAddress}
                errors={errors}
                address={address}
                isDisplay={showModalShippingAddress}
                onClose={() => { setShowModalShippingAddress(!showModalShippingAddress) }}
                titleModal='Thêm địa chỉ'
            />
        </>
    )
}