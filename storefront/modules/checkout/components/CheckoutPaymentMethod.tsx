import React from 'react'
import { OptionSelect } from '@/common/OptionSelect'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { PaymentMethod } from '@/modules/orders/model/enum/PaymentMethod'
import { DeliveryMethod } from '@/modules/orders/model/enum/DeliveryMethod'

interface CheckoutFormData {
    paymentMethod?: PaymentMethod;
    deliveryMethod?: DeliveryMethod;
}

type Props = {
    display: boolean;
    model?: CheckoutFormData;
    onClose: () => void; 
    onConfirm: () => void; 
    register: UseFormRegister<CheckoutFormData>;
    setValue: UseFormSetValue<CheckoutFormData>;
    onUpdate: (data: CheckoutFormData) => void;
}

export default function CheckoutPaymentMethod({ 
    onUpdate, 
    register, 
    model, 
    display, 
    onConfirm, 
    onClose,
    setValue 
}: Props) {

    const handlePaymentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as PaymentMethod;
        setValue('paymentMethod', value);
        onUpdate({ paymentMethod: value });
    }

    const handleDeliveryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as DeliveryMethod;
        setValue('deliveryMethod', value);
        onUpdate({ deliveryMethod: value });
    }

    const deliveryOptions = Object.values(DeliveryMethod).map((val) => ({ id: val, name: val }));
    const paymentOptions = Object.values(PaymentMethod).map((val) => ({ id: val, name: val }));

    if (!display) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
                onClick={onClose} 
            />

            <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Cấu hình đơn hàng</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
                </div>

                <div className="p-6 space-y-5">
                    <div className="space-y-4">
                        <OptionSelect
                            labelText="Đơn vị vận chuyển"
                            field="deliveryMethod"
                            register={register}
                            options={deliveryOptions}
                            registerOptions={{
                                required: 'Vui lòng chọn đơn vị vận chuyển',
                                onChange: handleDeliveryChange
                            }}
                            defaultValue={model?.deliveryMethod}
                        />

                        <OptionSelect
                            labelText="Phương thức thanh toán"
                            field="paymentMethod"
                            register={register}
                            options={paymentOptions}
                            registerOptions={{
                                required: 'Vui lòng chọn phương thức thanh toán',
                                onChange: handlePaymentChange
                            }}
                            defaultValue={model?.paymentMethod}
                        />
                    </div>

                    <p className="text-xs text-slate-500 italic">
                        * Bạn có thể thay đổi thông tin này trước khi hoàn tất đặt hàng.
                    </p>
                </div>

                <div className="px-6 py-4 bg-slate-50 flex flex-col sm:flex-row gap-3">
                    <button 
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
                    >
                        Quay lại
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="flex-[2] px-4 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-95"
                    >
                        Xác nhận đặt hàng
                    </button>
                </div>
            </div>
        </div>
    )
}