interface ProductTabContentProps {
    activeTab: string;
}

export default function ProductTabContent({ activeTab }: ProductTabContentProps) {
    const productDescription = (
        <div className="space-y-6 text-slate-700 leading-relaxed">
            <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Mô tả sản phẩm</h3>
                <p className="font-medium text-slate-800 mb-4 italic">Yêu Những Điều Không Hoàn Hảo</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm bg-slate-50 p-4 rounded-lg">
                    <p><span className="text-slate-500">Tác giả:</span> Đại Đức Hae Min</p>
                    <p><span className="text-slate-500">Nhà xuất bản:</span> Thế Giới</p>
                    <p><span className="text-slate-500">Số trang:</span> 320 trang</p>
                    <p><span className="text-slate-500">Kích thước:</span> 14 x 20.5 cm</p>
                    <p><span className="text-slate-500">Trọng lượng:</span> 350g</p>
                    <p><span className="text-slate-500">Mã ISBN:</span> 978-604-77-9266-9</p>
                </div>
            </div>

            <div>
                <h4 className="font-bold text-slate-900 mb-2 underline underline-offset-4">Giới thiệu về sản phẩm</h4>
                <p className="mb-4">
                    Yêu Những Điều Không Hoàn Hảo là một cuốn sách chứa đựng những triết lý sâu sắc về cuộc sống, được viết bởi Đại Đức Hae Min – một nhà sư nổi tiếng đến từ Hàn Quốc. Cuốn sách là lời động viên dành cho những ai đang cảm thấy mệt mỏi, hoài nghi về bản thân.
                </p>
                <p className="font-bold mb-2">Điểm đặc biệt của cuốn sách:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Văn phong nhẹ nhàng, dễ hiểu, phù hợp với mọi đối tượng độc giả.</li>
                    <li>Nội dung có nhiều ví dụ thực tế giúp người đọc dễ dàng áp dụng.</li>
                    <li>Lời khuyên hữu ích để cân bằng cảm xúc và sống hạnh phúc hơn.</li>
                </ul>
            </div>
        </div>
    );

    // 2. Nội dung Bảo hành
    const warrantyInfo = (
        <div className="space-y-6 text-slate-700">
            <h3 className="text-lg font-bold text-slate-900">Thông tin bảo hành và đổi trả</h3>

            <div className="space-y-4">
                <section>
                    <p className="font-bold text-slate-800 mb-2">1. Điều kiện áp dụng đổi trả</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Sản phẩm còn nguyên tem, chưa qua sử dụng, không hư hỏng do lỗi khách hàng.</li>
                        <li>Thời gian đổi trả trong vòng 7 ngày kể từ khi nhận hàng.</li>
                        <li>Có đầy đủ hóa đơn mua hàng hoặc thông tin đơn hàng xác minh.</li>
                    </ul>
                </section>

                <section>
                    <p className="font-bold text-slate-800 mb-2">2. Quy trình đổi trả</p>
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                        <li>Liên hệ bộ phận chăm sóc khách hàng qua email hoặc hotline.</li>
                        <li>Gửi sản phẩm về kho hàng theo địa chỉ được cung cấp.</li>
                        <li>Chúng tôi kiểm tra và tiến hành đổi hàng mới hoặc hoàn tiền.</li>
                    </ol>
                </section>
            </div>
        </div>
    );

    // 3. Nội dung Giao hàng
    const shippingInfo = (
        <div className="space-y-6 text-slate-700">
            <h3 className="text-lg font-bold text-slate-900">Thông tin vận chuyển</h3>

            <div className="overflow-hidden border border-slate-200 rounded-lg">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Khu vực</th>
                            <th className="px-4 py-2 border-b">Thời gian</th>
                            <th className="px-4 py-2 border-b">Chi phí</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr>
                            <td className="px-4 py-2">Nội thành (HCM & HN)</td>
                            <td className="px-4 py-2">1-2 ngày</td>
                            <td className="px-4 py-2">20.000 VNĐ</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2">Tỉnh thành khác</td>
                            <td className="px-4 py-2">2-5 ngày</td>
                            <td className="px-4 py-2">32.000 VNĐ</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <p className="text-xs text-amber-800 font-medium italic">
                    Lưu ý: Không giao hàng vào thứ 7, Chủ nhật và các ngày Lễ, Tết.
                </p>
            </div>
        </div>
    );

    // 4. Nội dung Người bán
    const sellerInfo = (
        <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Thông tin nhà cung cấp</h3>
            <div className="space-y-2 text-sm">
                <p><span className="text-slate-500">Nhà cung cấp:</span> <span className="font-bold text-slate-900">Đỗ Tài</span></p>
                <p><span className="text-slate-500">Số điện thoại hỗ trợ:</span> <span className="font-bold text-blue-600">123456860</span></p>
                <p><span className="text-slate-500">Địa chỉ:</span> Việt Nam</p>
            </div>
        </div>
    );

    switch (activeTab) {
        case "specification": return productDescription;
        case "warranty": return warrantyInfo;
        case "shipping": return shippingInfo;
        case "seller": return sellerInfo;
        default: return null;
    }
}