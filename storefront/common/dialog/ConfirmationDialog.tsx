type DialogProps = {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    okText: string;
    cancelText: string;
    isShowOk: boolean;
    isShowCancel: boolean;
    ok: () => void;
    cancel: () => void;
}

export default function ConfimationDialog(
    {

        isOpen, title, children, okText, cancelText, isShowOk
        , isShowCancel, ok, cancel

    }: DialogProps

) {
    if(!isOpen) return null;

    return (
        <div className="fixed flex items-center justify-center bg-black inset-0 bg-opacity-50">
            <div className="bg-white shadow-lg rounded-lg w-96">
                {/* header */}

                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button onClick={cancel} className="text-gray-500 hover:text-black">
                        X
                    </button>
                </div>


                {/* body */}

                <div className="p-4">{children}</div>


                {/* footer */}
                <div className="p-4 justify-end flex gap-2" >
                    {isShowCancel && (
                        <button
                        onClick={cancel}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">{cancelText}</button>
                    )}
                    {isShowOk && (
                        <button
                        onClick={ok}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{okText}</button>
                    )}

                </div>


            </div>

        </div>
    )
}