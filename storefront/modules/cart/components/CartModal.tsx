import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const CartModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Nút mở modal */}
            <button
                onClick={() => setIsOpen(true)}
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
                    onClick={() => setIsOpen(false)} // Đóng modal khi click vào backdrop
                >
                    <div
                        className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm"
                        onClick={(e) => e.stopPropagation()} // Ngăn sự kiện đóng modal khi click vào nội dung modal
                    >
                        <div className="flex items-center pb-4 text-xl font-medium text-slate-800">
                            It's a simple Modal
                        </div>
                        <div className="border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
                            The key to more success is to have a lot of pillows. Put it this
                            way, it took me twenty-five years to get these plants, twenty-five
                            years of blood, sweat, and tears, and I&apos;m never giving up,
                            I&apos;m just getting started.
                        </div>
                        <div className="flex items-center pt-4 justify-end">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 active:bg-green-700 hover:bg-green-700 ml-2"
                                type="button"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartModal;
