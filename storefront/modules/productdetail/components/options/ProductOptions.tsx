import { SetStateAction, useState } from "react"

type Props = {
    onQuantityChange: (quantity: number ) => void
}

export default function ProductOptions({onQuantityChange} : Props) {
    const[quantity,setQuantity] = useState(1);

    const updateQuantity = (newQuantity: number) => {
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    }

    const increaseQuantity = () =>{
        const newQuantity = quantity + 1 
        setQuantity(newQuantity);
        onQuantityChange(newQuantity)
    }
    const decreaseQuantity = () => {
        if(quantity > 1) {
            const newQuantity = quantity -1
            setQuantity(newQuantity);
            onQuantityChange(newQuantity);
        }
    }
    return (
        <>
            <div className=" w-[60%] ">
                <div className="flex-grow w-[30%]">
                    <div className="text-left">Số lượng</div>

                    <div className="flex items-center border border-gray-300 rounded-md w-32 grow">
                        <button className="bg-gray-200 px-3 py-2 hover:bg-gray-300 grow"
                            onClick={decreaseQuantity}
                        >−</button>
                        <input min="1" value={quantity} className="w-full text-center border-x border-gray-300 outline-none"
                            onChange={(e) => updateQuantity(Number(e.target.value))}
                        />
                        <button className="bg-gray-200 px-3 py-2 hover:bg-gray-300 grow"
                            onClick={increaseQuantity}
                        >+</button>
                    </div>
                </div>

            </div>
        </>
    )
}