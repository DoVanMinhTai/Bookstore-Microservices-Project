    import React, { useEffect, useState } from 'react'
    import { Address } from '../model/Address'
    import { FieldErrorsImpl, UseFormRegister, UseFormSetValue } from 'react-hook-form'
    import { CountryVm } from '@/modules/country/model/CountryVm';
    import { StateOrProvince } from '@/modules/stateorprovince/model/StateOrProvince';
    import { Districts } from '@/modules/districts/model/Districts';
    import { useRouter } from 'next/router';
    import { Input } from '@/common/Input';
    import { OptionSelect } from '@/common/OptionSelect';
    import { getAllCoutries, getStateOrProvinces, getDistricts } from '@/modules/country/service/CountryService';
    type AddressFormProps = {
        handleSubmit: () => {};
        register: UseFormRegister<Address>;
        setValue: UseFormSetValue<Address>;
        errors: FieldErrorsImpl<Address>;
        address: Address | undefined;
        isDisplay?: boolean | true;
        buttonText?: string;
    }

    export default function AddressForm({ handleSubmit, register, setValue, errors, address, isDisplay, buttonText }: AddressFormProps) {
        const [countries, setCountries] = useState<CountryVm[]>([]);
        const [stateOrProvinces, setStateOrProvinces] = useState<StateOrProvince[]>()
        const [districts, setDistricts] = useState<Districts[]>([]);
        const router = useRouter();
        const { id } = router.query;


        useEffect(() => {
            getAllCoutries().then((res) => {
                console.log(res);

                setCountries(res);
            });
        }, []);

        useEffect(() => {
            if (address) {
                getStateOrProvinces(address.stateOrProvinceId).then((data) => { setStateOrProvinces(data) });
                getDistricts(address.districtId).then((data) => { setDistricts(data) });
            }

        }, [id]);


        const onCountryChange = async (event: any) => {
            setValue('countryName', event.target.selectedOptions[0].text);
            console.log(event.target.value);
            
            getStateOrProvinces(event.target.value).then(setStateOrProvinces);
        };

        const onStateOrProvinceChange = async (event: any) => {
            setValue('stateOrProvinceName', event.target.selectedOptions[0].text);
            getDistricts(event.target.value).then(setDistricts);
        };


        return (
            <>
                <div className={`fixed flex-col inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isDisplay ? '' : 'hidden'} `} >
                    <div className="bg-white p-5 rounded-lg shadow-lg w-1/2 max-w-lg">
                    <h2 className="text-lg font-bold p-2 shadow-sm ">Thêm địa chỉ</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                labelText="Contact name"
                                register={register}
                                field="contactName"
                                registerOptions={{ required: { value: true, message: 'This field is required' } }}
                                defaultValue={address?.contactName} />
                            <Input labelText="Phone number" register={register} field="phone" registerOptions={{ required: { value: true, message: 'This field is required' } }} defaultValue={address?.phone} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <OptionSelect
                                labelText="Country"
                                field="countryId"
                                placeholder="Select country"
                                options={countries}
                                register={register} registerOptions={{
                                    required: {
                                        value: true, message: 'Please select country'

                                    }, onChange: onCountryChange
                                }}
                                error={errors.countryId?.message}
                                defaultValue={address?.countryId} />
                            <OptionSelect labelText="State Or Province" register={register} field="stateOrProvinceId" options={stateOrProvinces} placeholder="Select state or province" defaultValue={address?.stateOrProvinceId} registerOptions={{ required: { value: true, message: 'Please select state or province' }, onChange: onStateOrProvinceChange }} />
                            <OptionSelect labelText="District" register={register} field="districtId"
                                options={districts} placeholder="Select district"
                                defaultValue={address?.districtId}
                                registerOptions={{
                                    required: { value: true, message: 'Please select district' }
                                    , onChange: (event: any) => setValue('districtName', event.target.selectedOptions[0].text)
                                }} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <Input labelText="City" 
                            register={register} field="city" 
                            placeholder="Please skip this field if you are not in a city" 
                            defaultValue={address?.city} />
                            <Input labelText="Zip code" register={register} field="zipCode" registerOptions={{ required: { value: true, message: 'This field is required' } }} defaultValue={address?.zipCode} />
                        </div>
                        <div className="mt-4">
                            <Input labelText="Address" register={register} field="addressLine1" registerOptions={{ required: { value: true, message: 'This field is required' } }} defaultValue={address?.addressLine1} />
                            <Input labelText="Address2" register={register} field="addressLine2" placeholder="" defaultValue={address?.addressLine2} />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSubmit}>
                                {buttonText ?? 'Create'}
                            </button>
                        </div>
                    </div>

                </div>
            </>

        )
    }
