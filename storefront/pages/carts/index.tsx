import { useCartContext } from '@/context/CartContext';
import { CartItemGetDetailVms } from '@/modules/cart/model/CartItemGetVm'
import { getCartItemDetailVms, updateCartItem } from '@/modules/cart/services/CartServices';
import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link';
import { deleteCartItemByProductId } from '@/modules/cart/services/CartServices';
import { formatPrice } from '@/utils/formatPrice';
import { useRouter } from 'next/router';
import ConfimationDialog from '@/common/dialog/ConfirmationDialog';
import { CartItemPutVm } from '@/modules/cart/model/CartItemPutVm';
import { CartItem, calculateTotalPrice } from '@/modules/cart/components/CartItem';
import { CheckoutItem } from '@/modules/checkout/model/CheckoutItem';
import { Checkout } from '@/modules/checkout/model/Checkout';
import { useUserInfoContext } from '@/context/UserInforProvider';
import { createCheckout } from '@/modules/checkout/service/CheckoutService';

const Index = () => {
  const [cartItems, setCartItem] = useState<CartItemGetDetailVms[]>([]);
  const [productIdToRemove, setProductIdToRemove] = useState<number>(0);
  const { fetchNumberCartItems, numberCartItems } = useCartContext();
  const [selectedCartItem, setSelectedCartItem] = useState<Set<number>>(new Set());
  const { email } = useUserInfoContext();
  const [isDropdown, setIsDropdown] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const loadCartDetail = useCallback(async () => {
    setIsLoading(true);
    try {
      const newCartItems = await getCartItemDetailVms()
      setCartItem(newCartItems);
      fetchNumberCartItems();
    } finally {
      setIsLoading(false);
    }
  }, [fetchNumberCartItems]);

  useEffect(() => {
    loadCartDetail()
  }, [loadCartDetail])

  const deleteCartItem = async (productId: number) => {
    try {
      await deleteCartItemByProductId(productId);
      setCartItem((prevItem) => prevItem.filter((item) => item.productId !== productId));

      fetchNumberCartItems();
    } catch (error) {
      throw new Error("error server")
    }
  }

  const handleDecreaseQuantity = async (productId: number) => {
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
  const handleIncreaseQuantity = async (productId: number) => {
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
    setCartItem(prevsItem => prevsItem.map(
      item => item.productId === productId ? { ...item, quantity } : item
    ))
    try {

      await updateCartItem(productId, payload);
    } catch (error) {
      console.error(error)
    }

  }
  const handleDialogDeleteCartItem = (productId: number) => {
    setProductIdToRemove(productId)
    setIsShowDialog(true);
  }

  const handleDeleteCartItem = async (productId: number) => {
    try {

      await deleteCartItemByProductId(productId);
      loadCartDetail();
      setIsShowDialog(false);
      setProductIdToRemove(0);
    } catch (error) {
      console.error(error);
    }

  }

  const handleSelectedCartItemChange = (productId: number) => {
    setSelectedCartItem((prev) => {
      const newSelectedCart = new Set(prev);
      if (newSelectedCart.has(productId)) {
        newSelectedCart.delete(productId);
      } else {
        newSelectedCart.add(productId)
      }
      return newSelectedCart;
    });

  }


  const totalPrice = calculateTotalPrice(cartItems, [...selectedCartItem]);

  const getSelectedCartItem = () => {
    if (!cartItems || !selectedCartItem) return []
    return cartItems.filter((item) => selectedCartItem.has(item.productId));
  }

  const handleCheckout = () => {
    const cartItems = getSelectedCartItem();

    if (cartItems.length === 0) {
      alert("Vui lòng chọn 1 sản phẩm")
      return;
    }

    const checkoutItem = cartItems.map((item) => convertItemToCheckoutItem(item))

    const checkOut: Checkout = {
      email: email,
      note: '',
      promotionCode: 'JAHFKHLD',
      checkOutItemPostVms: checkoutItem
    }

    createCheckout(checkOut).then((res) => {
      router.push(`/checkouts/${res?.id}`)
    }).catch((error) => {
      if (error.status === 403) {
        throw new Error("Bạn vui lòng đăng nhập trước");
      }
    }
    )
  }

  const convertItemToCheckoutItem = (cartItems: CartItemGetDetailVms): CheckoutItem => {
    return {
      productId: cartItems.productId,
      description: "a1",
      quantity: cartItems.quantity,
    };
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
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">Select</th>
                      <th className="border p-2">Product</th>
                      <th className="border p-2">Quantity</th>
                      <th className="border p-2">Price</th>
                      <th className="border p-2">Actions</th>
                    </tr>
                  </thead>
                  {cartItems.map((cartItem) => {
                    return <CartItem
                      key={cartItem.productId}
                      item={cartItem}
                      isLoading={isLoading}
                      isSelected={selectedCartItem.has(cartItem.productId)}
                      handleSelectedCartItemChange={handleSelectedCartItemChange}
                      handleDecreaseQuantity={handleDecreaseQuantity}
                      handleIncreaseQuantity={handleIncreaseQuantity}
                      handleDialogDeleteCartItem={handleDialogDeleteCartItem}
                    />
                  })}
                </table>
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
                <div className="mt-20 border-t-2 flex justify-between">
                  <label htmlFor=""
                    className="text-lg font-bold text-gray-700 mb-5" >
                    Tổng tiền
                  </label>
                  <div className="font-bold text-lg text-gray-700 mb-5 ">{formatPrice(totalPrice)}</div>
                </div>
                <button className="mt-10 py-5 w-full bg-blue-700" onClick={handleCheckout}>Checkout</button>

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
export default Index