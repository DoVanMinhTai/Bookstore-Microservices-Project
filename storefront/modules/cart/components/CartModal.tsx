import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { CartItemGetDetailVms, CartItemGetVm } from "../model/CartItemGetVm";
import { getCartItems } from "../services/CartServices";
import { error } from "console";
import { getCartItemDetailVms } from "../services/CartServices";
import { formatPrice } from "@/utils/formatPrice";
import ImageWithFallBack from "@/common/components/ImageWithFallBack";
import { useCartContext } from "@/context/CartContext";
import Link from "next/link";
const CartModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItem] = useState<CartItemGetDetailVms[]>([]);
    const { fetchNumberCartItems } = useCartContext();
    useEffect(() => {
        getCartItemDetailVms()
            .then((res) => {
                setCartItem(res);
                console.log(res);

            })
            .catch((error) =>
                setCartItem([]))
    }, []);

    return (
        <div>
            {/* Nút mở modal */}
            <button
                onClick={() => {

                    getCartItemDetailVms().then((res) => setCartItem(res))
                        .catch((error) => console.log(error))
                    setIsOpen(true);
                }}
                className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg
                 focus:bg-slate-700 focus:shadow-none active:bg-slate-700
                 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                type="button"
            >
                <FontAwesomeIcon icon={faShoppingCart} className="px-1" />
            </button>

            {/* Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[999] flex items-center justify-center  bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="relative m-4 p-4 w-2/5 min-w-[45%] max-w-[45%] rounded-lg bg-white shadow-sm"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="flex items-center w-full">
                            <div className="w-full">
                                <div className="w-full text-center items-center pb-4 text-xl font-medium text-slate-800">
                                    Giỏ Hàng
                                </div>
                                <div className="border-t w-full border-slate-200 py-4 leading-normal text-slate-600 font-light">
                                    {

                                        cartItems.length > 0 ?

                                            <>
                                                <div className="flex gap-10 p-3 flex-grow items-center w-full">
                                                    <label className="block text-gray-700 text-sm font-bold  w-[50%]">
                                                        Tên sản phẩm
                                                    </label>
                                                    <label className="block text-gray-700 font-bold  text-sm w-[30%]">Số lượng</label>
                                                    <label className="block text-gray-700 font-bold  text-sm  w-[20%]  ml-[15%]">Giá tiền</label>

                                                </div>


                                                {cartItems.map((cartItem) => (
                                                    <>
                                                        <div className="flex gap-10 p-3 flex-grow items-center" key={cartItem.productId}>

                                                            <div className="w-[50%] ">

                                                                <div className=" flex flex-row items-center gap-3">
                                                                    <div className="h-12 w-12">

                                                                        {/* {cartItem.thumbnailUrl} */}
                                                                        <ImageWithFallBack className="h-full w-full object-cover rounded-md" src={cartItem.thumbnailUrl} alt={cartItem.productName} />
                                                                    </div>
                                                                    <div>{cartItem.productName}</div>
                                                                </div>
                                                            </div>
                                                            <div className="w-[30%]">
                                                                <div className=" flex flex-row items-center justify-between gap-2">
                                                                    <input
                                                                        id="amountInput"
                                                                        type="number"
                                                                        value={cartItem.quantity}
                                                                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                                    />
                                                                    <div className="h-12 w-12 items-center flex gap-2">
                                                                        <button
                                                                            id="decreaseButton"
                                                                            className="rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                                            type="button"
                                                                        >
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                viewBox="0 0 16 16"
                                                                                fill="currentColor"
                                                                                className="w-4 h-4"
                                                                            >
                                                                                <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                                                                            </svg>
                                                                        </button>
                                                                        <button
                                                                            id="increaseButton"
                                                                            className=" rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                                            type="button"
                                                                        >
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                viewBox="0 0 16 16"
                                                                                fill="currentColor"
                                                                                className="w-4 h-4"
                                                                            >
                                                                                <path
                                                                                    d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                    </div>

                                                                </div>

                                                            </div>

                                                            <div className="w-[20%] ml-[15%]">
                                                                <div className=" flex flex-row items-center gap-3">
                                                                    <div>   {formatPrice(cartItem.quantity * cartItem.price)}
                                                                    </div>
                                                                    <div className="h-12 w-12">
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                                )}
                                            </>


                                            : (
                                                <div>Giỏ hàng đang trống nè</div>
                                            )


                                    }



                                </div>
                            </div>
                        </div>
                        <div className="flex items-center pt-4 justify-end">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                                type="button"
                            >
                                Tiếp tục mua hàng
                            </button>
                            <Link
                                onClick={() => setIsOpen(false)}
                                className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 active:bg-green-700 hover:bg-green-700 ml-2"
                                href="/carts">
                                Xem chi tiết giỏ hàng
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartModal;
