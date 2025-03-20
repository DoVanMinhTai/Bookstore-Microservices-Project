import { useCartContext } from '@/context/CartContext';
import { CartItemGetDetailVms } from '@/modules/cart/model/CartItemGetVm'
import { getCartItemDetailVms, updateCartItem } from '@/modules/cart/services/CartServices';
import { error } from 'console';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import ImageWithFallBack from '@/common/components/ImageWithFallBack';
import apiClientService from '@/common/components/services/ApiClientService';
import { deleteCartItemByProductIds } from '@/modules/cart/services/CartServices';
import { formatPrice } from '@/utils/formatPrice';
import { useRouter } from 'next/router';
import ConfimationDialog from '@/common/dialog/ConfirmationDialog';
import { CartItemPutVm } from '@/modules/cart/model/CartItemPutVm';
import { ok } from 'assert';
const index = () => {
  const [cartItems, setCartItem] = useState<CartItemGetDetailVms[]>([]);
  const [isDropdown, setIsDropdown] = useState(false);
  const [productIdToRemove, setProductIdToRemove] = useState<number>(0);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const { fetchNumberCartItems, numberCartItems } = useCartContext();
  const [quantity, setQuantity] = useState(0);
  const router = useRouter();
  useEffect(() => {
    loadCartDetail()
  }, [])

  const loadCartDetail = async () => {
    try {
      const newCartItems = await getCartItemDetailVms()
      console.log(newCartItems);
      
      setCartItem(newCartItems);
      fetchNumberCartItems();
    } catch (error) {
      return [];
    }
  }

  const deleteCartItem = async (productId: number) => {
    try {
      await deleteCartItemByProductIds(productId);
      setCartItem((prevItem) => prevItem.filter((item) => item.productId !== productId));

      fetchNumberCartItems();
    } catch (error) {
      throw new Error("error server")
    }
  }

  const handelDecreaseQuantity = async (productId: number) => {
    const cartItem = cartItems.find((item) => item.productId === productId);
    if (!cartItem) {
      return;
    }
    const newQuantity = cartItem.quantity - 1;
    if (newQuantity < 1) {
      handleDialogDeleteCartItem(productId)
    } else {
      await updateCartItemQuantity(productId, newQuantity);
    }
  }
  const handelIncreaseQuantity = async (productId: number) => {
    const cartItem = cartItems.find((item) => item.productId === productId);
    if (!cartItem) {
      return;
    }
    const newQuantity = cartItem.quantity + 1;

    await updateCartItemQuantity(productId, newQuantity);

  }
  const updateCartItemQuantity = async (productId: number, quantity: number) => {
    const payload: CartItemPutVm = {
      quantity: quantity
    }
    await updateCartItem(productId, payload);
    loadCartDetail();
  }
  const handleDialogDeleteCartItem = (productId: number) => {
    setProductIdToRemove(productId)
    setIsShowDialog(true);
  }

  const handleDeleteCartItem = async (productId: number) => {
    try {

      await deleteCartItemByProductIds(productId);
    } catch (error) {
      console.error(error);
    }
    loadCartDetail();
    setIsShowDialog(false);
    setProductIdToRemove(0);
  }

  const handleCheckout = () => {
    router.push('/checkout')
  }
  return (
    <>
      <div className="container mx-auto my-5 px-4">
        {cartItems.length > 0 ?
          <>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 p-5 bg-[#fff] border-2 rounded-lg">
                <div className="flex justify-between mb-4 ">
                  <label className="text-2xl  font-bold block text-gray-700 py-10" >
                    Chi tiết giỏ hàng
                  </label>
                  <div className="text-lg font-bold block text-gray-700 py-10 mr-5">{numberCartItems} sản phẩm</div>
                </div>

                {cartItems.map((item, index) => (

                  <div className={`flex gap-3 py-5 border-t-2 ${index === cartItems.length - 1 ? 'border-b-2' : 'border-b'}`}>
                    <div className="flex items-center mr-5 ">
                      <input type="checkbox" value="" className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 rounded-sm " />
                    </div>
                    <div className="w-[40%] flex gap-5">
                      <ImageWithFallBack className="h-20 w-20 object-cover rounded-md" src={item.thumbnailUrl} alt={item.productName} />
                      <div className="items-center flex">{item.productName}</div>
                    </div>
                    <div className="w-auto flex-1 items-center flex">
                      <input
                        id="amountInput"
                        type="number"

                        value={item.quantity}
                        className=" bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <div className="h-12 w-auto ml-3 items-center flex gap-2">
                        <button
                          id="decreaseButton"
                          className="rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          onClick={() => handelDecreaseQuantity(item.productId)}
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
                    <div className="w-[20%] flex justify-between ">
                      <div className="text-center items-center flex">{formatPrice(item.price)}</div>
                      <button onClick={() => deleteCartItem(item.productId)}>X</button>
                    </div>
                  </div>

                ))}
                <div className="h-48 items-center flex gap-3 ">


                  <Link href="/" className=" font-bold text-sm text-gray-700 items-center flex gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                    </svg>
                    <label htmlFor="">  Trở về trang chủ</label>
                  </Link>
                </div>
              </div>
              <div className="p-5 bg-[#dddddd] border-2">
                <label htmlFor="" className="text-2xl font-bold block text-gray-700 py-10">Tóm tắt</label>
                <div className="flex justify-between">
                  <div className="text-lg font-bold text-gray-700 mb-5">Tổng tiền</div>
                  <div>result tong tien</div>

                </div>

                <div className="flex justify-between">
                  <label className="text-lg font-bold text-gray-700 mb-5">Thời Gian Vận Chuyển</label>
                  <div>
                    <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                      onClick={() => setIsDropdown(!isDropdown)}
                    >Dropdown button
                      <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                      </svg>
                    </button>

                    {isDropdown && (<div id="dropdown" className="z-10 absolute  bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li>
                          <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                        </li>
                        <li>
                          <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                        </li>
                        <li>
                          <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                        </li>
                        <li>
                          <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                        </li>
                      </ul>
                    </div>)
                    }
                  </div>

                </div>
                <div className="mb-5">
                  <label htmlFor=""
                    className="text-lg font-bold text-gray-700 mb-5"
                  >Mã giảm giá</label>
                  <div>

                  </div>
                </div>
                <div className="mt-20 border-t-2">
                  <label htmlFor=""
                    className="text-lg font-bold text-gray-700 mb-5" >
                    Tổng tiền
                  </label>

                </div>
                {/* <button className="mt-10 py-5 w-full bg-blue-700" onClick={handleCheckout}>Checkout</button> */}

              </div>
            </div>
            <div>
              <ConfimationDialog
                isOpen={isShowDialog}
                title={'Xóa sản phẩm'}
                okText={"Xóa"}
                cancelText={"Hủy"}
                isShowCancel={true}
                isShowOk={true}
                cancel={() => setIsShowDialog(false)}
                ok={() => handleDeleteCartItem(productIdToRemove)}
              >
                <p>Bạn có muốn xóa sản phẩm trong giỏ hàng</p>
              </ConfimationDialog>
            </div>

          </>














          : <><div>Không có sản phẩm trong giỏ hàng</div></>

        }
      </div>
    </>
  )
}

export default index