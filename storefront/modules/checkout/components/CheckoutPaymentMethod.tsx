import { ProductThumbnail } from '@/modules/homepage/models/ProductThumbnail'
import React, { useState } from 'react'
import { CheckoutItem } from '../model/CheckoutItem'
import { AddressDetailVm } from '@/modules/address/model/AddressDetail'
import { OptionSelect } from '@/common/OptionSelect'
import { useForm, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { PaymentMethod } from '@/modules/orders/model/enum/PaymentMethod'
import { DeliveryMethod } from '@/modules/orders/model/enum/DeliveryMethod'

interface CheckoutFormData {
    paymentMethod?: PaymentMethod;
    deliveryMethod?: DeliveryMethod;
}

type Props = {
    display: boolean | true;
    model?: CheckoutFormData
    handleSubmit: () => {}
    register: UseFormRegister<CheckoutFormData>;
    setValue: UseFormSetValue<CheckoutFormData>;
    onUpdate: (data: CheckoutFormData) => void;
}


export default function CheckoutPaymentMethod({ onUpdate, register, model, display, handleSubmit, setValue }: Props) {
    const [checkoutFormData, setCheckoutFormData] = useState<CheckoutFormData>();
    const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>();
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();

    // const handleChangeDeliveryMethod = (checkoutFormData: CheckoutFormData) => {
    //     if(checkoutFormData)  setCheckoutFormData(checkoutFormData);
    //     setValue("paymentMethod",checkoutFormData.paymentMethod)
    //     setValue("deliveryMethod",checkoutFormData.deliveryMethod)
    //     console.log('132',checkoutFormData?.deliveryMethod);
    //     console.log('1323',checkoutFormData?.paymentMethod);


    // }

    const onPaymentMethod = (event: any) => {
        console.log('last', event.target.selectedOptions[0].text);
        const selected = event.target.selectedOptions[0].text as PaymentMethod;
        setValue('paymentMethod', event.target.selectedOptions[0].text);
        onUpdate({ paymentMethod: selected });
    }
    const onDeliveryMethod = (event: any) => {
        const selected = event.target.selectedOptions[0].text as DeliveryMethod;
        setValue('deliveryMethod', event.target.selectedOptions[0].text);
        onUpdate({ deliveryMethod: selected });
    }

    const deliveryMethodArrays = Object.values(DeliveryMethod).map((item) => ({
        id: item as string,
        name: item as string
    }));
    const paymentMethodArrays = Object.values(PaymentMethod).map((item) => ({
        id: item as string,
        name: item as string
    }));


    return (
        display &&
        <div className="fixed inset-0 flex items-center justify-center bg-black 
            bg-opacity-50 z-50
        ">
            <div className="bg-white p-6 rounded-lg shadow-lg">

                <div className="text-center text-lg font-bold text-gray-700">
                    <label htmlFor="">   Phương thức thanh toán</label>
                </div>

                <OptionSelect
                    labelText="Chọn đơn vị vận chuyển"
                    field="deliveryMethod"
                    register={register}
                    options={deliveryMethodArrays}
                    registerOptions={{
                        required: {
                            value: true, message: 'Please select delivery method'
                        }, onChange: onDeliveryMethod
                    }}
                    defaultValue={model?.deliveryMethod}
                />

                <OptionSelect
                    labelText="Chọn phương thức thanh toán"
                    field="paymentMethod"
                    register={register}
                    options={paymentMethodArrays}
                    registerOptions={{
                        required: {
                            value: true, message: 'Please select payment method'
                        }, onChange: onPaymentMethod
                    }}
                    defaultValue={model?.paymentMethod}
                />

                <button onClick={handleSubmit}>Thanh toán</button>
            </div>
        </div>
    )
}
