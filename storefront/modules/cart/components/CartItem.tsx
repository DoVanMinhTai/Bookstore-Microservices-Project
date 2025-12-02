import { FC } from "react";
import { formatPrice } from "@/utils/formatPrice";
import { CartItemGetDetailVms } from "../model/CartItemGetVm";
import ImageWithFallBack from "@/common/components/ImageWithFallBack";
interface itemProps {
    item: CartItemGetDetailVms;
    isLoading: boolean;
    isSelected: boolean;
    handleSelectedCartItemChange: (productId: number) => void;
    handleDecreaseQuantity: (productId: number) => void;
    handleIncreaseQuantity: (productId: number) => void;
    handleDialogDeleteCartItem: (productId: number) => void;
}

export const calculateTotalPrice = (items : CartItemGetDetailVms[], selecteditem: number[]) => {
    return items.filter((item) => selecteditem.includes(item.productId))
            .reduce((totalPrice,index) => totalPrice + index.price *index.quantity,0);
}

export const CartItem: FC<itemProps> = ({ item, isLoading, isSelected, handleSelectedCartItemChange
    , handleDecreaseQuantity, handleIncreaseQuantity, handleDialogDeleteCartItem
}) => {
    return (
        <tbody>
                <tr key={item.productId} className="border">
                    <td className="border p-2 text-center">
                        <input
                            type="checkbox"
                            value={item.productId}
                            className="w-4 h-4"
                            checked={isSelected}
                            onChange={() => handleSelectedCartItemChange(item.productId)}
                        />
                    </td>
                    <td className="border p-2 flex items-center gap-3">
                        <ImageWithFallBack src={item.thumbnailUrl} alt={item.productName}  className="h-12 w-12 object-cover rounded-md"  />
                        {item.productName}
                    </td>
                    <td className="border p-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                            <button onClick={() => handleDecreaseQuantity(item.productId)} className="px-2 py-1 bg-gray-300 rounded">-</button>
                            <input
                                type="number"
                                value={item.quantity}
                                className="w-12 text-center border"
                                readOnly
                            />
                            <button onClick={() => handleIncreaseQuantity(item.productId)} className="px-2 py-1 bg-gray-300 rounded">+</button>
                        </div>
                    </td>
                    <td className="border p-2 text-center">{formatPrice(item.price)}</td>
                    <td className="border p-2 text-center">
                        <button
                            onClick={() => handleDialogDeleteCartItem(item.productId)}
                            className="px-3 py-1 bg-red-500 text-white rounded"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
        </tbody>
    )

}

