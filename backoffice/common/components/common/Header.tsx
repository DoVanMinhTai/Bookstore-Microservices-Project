import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import AuthenticationInfo from '../AuthenticationInfo';

const Header = () => {
    return (
        <header >
            {/* Header Top */}
            <div className="header-wrapper">
                <div className="header-top bg-[#161519] text-white flex">
                    <div className="container mx-auto flex  justify-between items-center ">
                        <div className="flex  items-center justify-center h-full p-1">
                            <ul className="p-0 m-0 gap-3 flex items-center justify-center text-sm h-full ">
                                <li className="">Đặt bánh lấy ngay tại Thành phố Hồ Chí Minh</li>
                                <li className="">Hệ thống sách chính hãng</li>
                                <li className="">Hotline: 01234576789</li>
                            </ul>
                        </div>
                        <div className="flex hide-for-medium flex-right">
                            <ul className="nav top-bar-nav nav-right nav-small nav-divided">
                                <li className="html header-social-icons">
                                    <div className="social-icons follow-icons flex gap-3">
                                        <a href="#">
                                            <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                                        </a>
                                        <a href="#">
                                            <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                                        </a>
                                        <a href="#">
                                            <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                                        </a>

                                        <a href="#">
                                            <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                                        </a>
                                        <a href="#">
                                            <FontAwesomeIcon icon={faPinterest}></FontAwesomeIcon>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header Center */}
            <div className="w-full my-1 mx-auto container">
                <div className="container w-full">
                    <div className="flex p-0 m-0 w-full  gap-3">
                        <div className="p-0 m-0 rounded-lg border-gray-500 border-3">
                            <Link href="/">
                                {/* <Image src={logo} alt='logo image' width={100} height={100} /> */}
                            </Link>
                        </div>
                        <div className="flex grow justify-between">
                            <ul className="flex h-full items-center space-x-6 p-0 ">
                                <li>
                                    <a href="" className="active no-underline">Trang chủ</a>
                                </li>

                                <li className="relative group">
                                    <a href="" className='no-underline'>Danh mục</a>

                                </li>

                                <li>
                                    <a className='no-underline' href="">Giới thiệu</a>
                                </li>
                            </ul>


                            {/* Cart & Account */}
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <AuthenticationInfo />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Header