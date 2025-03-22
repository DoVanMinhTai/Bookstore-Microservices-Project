import React from 'react'
import { Checkout } from '../model/Checkout'
import AddressForm from '@/modules/address/components/AddressForm'
type Props = {
    checkout: Checkout;
}

export default function CheckoutShippingInfo({ checkout }: Props) {
    return (
        <>
            <div className="  p-5 gap-3">
                <div className="font-bold text-center text-lg text-gray-700">

                    Thông tin giao hàng
                </div>
                <div className="mt-5 flex flex-col gap-5 w-full">
                    <div className="flex justify-between">
                        <div>Email</div>
                        <label >
                            {checkout?.email}
                        </label>
                    </div>
                    <div className="flex justify-between">
                        <div>Ghi chú</div>
                        <label >
                            {checkout?.note}
                        </label>
                    </div>
                    <div className="flex justify-between">
                        <div>Mã giảm giá</div>
                        <label >
                            {checkout?.promotionCode}
                        </label>
                    </div>
                </div>
                <AddressForm
                    handleSubmit={}
                    register={}
                    setValue={}
                    errors={}
                    address={}

                />
            </div>
        </>
    )
}