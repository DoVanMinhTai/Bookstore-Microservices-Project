import ImageWithFallBack from '@/common/components/ImageWithFallBack';
import { UserInfoContext, useUserInfoContext } from '@/context/UserInforProvider';
import React from 'react';

type Props = {
  title?: string;
};

const Profile = ({ title = "Default Title" }: Props) => {
  const { firstname, email, lastname } = useUserInfoContext();

  
  return (
    <div className="container mx-auto"
    >
      <div className="grid grid-cols-9">
        <div className="col-span-2 ">
          <ImageWithFallBack src='abaa' alt='imgae' className="rounded-full w-32 h-32 object-cover mx-auto" />
        </div>
        <div className=" px-5 gap-3 col-span-3">
          <div className="flex w-full gap-3 items-center">
            <label htmlFor="" className="font-bold text-sm text-gray-700">Tên người dùng: </label>
            <h3>{firstname} {lastname}</h3>
          </div>
          <div className="flex w-full gap-3 items-center">
            <label htmlFor="" className="font-bold text-sm text-gray-700">Email: </label>
            <h3>{email} </h3>
          </div>
          <div className="flex w-full gap-3 items-center">
            <label htmlFor="" className="font-bold text-sm text-gray-700">Tên người dùng: </label>
            <h3>{firstname} {lastname}</h3>
          </div>
          <div className="flex w-full gap-3 items-center">
            <label htmlFor="" className="font-bold text-sm text-gray-700">Tên người dùng: </label>
            <h3>{firstname} {lastname}</h3>
          </div>
          <div className="flex">
            <label htmlFor="" className="font-bold text-sm text-gray-700">Tên người dùng: </label>
            <h3>{firstname} {lastname}</h3>
          </div>
          <div className="flex">
            <label htmlFor="" className="font-bold text-sm text-gray-700">Tên người dùng: </label>
            <h3>{firstname} {lastname}</h3>
          </div>
          <div className="flex">
            <label htmlFor="" className="font-bold text-sm text-gray-700">Tên người dùng: </label>
            <h3>{firstname} {lastname}</h3>
          </div>

        </div>
        <div className="col-span-4">

        </div>
      </div>


    </div>
  );
};

export default Profile;
