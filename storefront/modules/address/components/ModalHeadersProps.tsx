import React from 'react'

type Props = {
    titleModal: string;
    onClose: () => void;
}

export default function ModalHeadersProps({ titleModal, onClose }: Props) {
    return (
        <div className="flex justify-between">
            <h2 className="text-lg font-bold shadow-sm ">{titleModal}</h2>
            <button
                onClick={() => { onClose() }}
                className=" text-gray-600 hover:text-gray-900"
            >
                ✖
            </button>
        </div>)
}