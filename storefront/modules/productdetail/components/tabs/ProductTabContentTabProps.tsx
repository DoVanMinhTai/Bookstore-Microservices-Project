interface ProductTabContentProps {
    activeTab: string;
}

export default function ProductTabContent({ activeTab }: ProductTabContentProps) {

    const productDescription = (
        <div>
            <h3 className="text-xl font-bold mb-2">Mô tả sản phẩm</h3>
            <p className="text-gray-700">
                Yêu Những Điều Không Hoàn Hảo
            </p>
            <p className="mt-2 text-gray-600">
                Tên sản phẩm: Yêu Những Điều Không Hoàn Hảo
                Tác giả: Đại Đức Hae Min
                Nhà xuất bản: Nhà xuất bản Thế Giới
                Số trang: 320 trang
                Ngôn ngữ: Tiếng Việt
                Hình thức: Bìa mềm
                Kích thước: 14 x 20.5 cm
                Trọng lượng: 350g
                Giá bìa: 150.000 VNĐ
                Thể loại: Sách kỹ năng sống, truyền cảm hứng
                Mã ISBN: 978-604-77-9266-9

                📌 Giới thiệu về sản phẩm
                "Yêu Những Điều Không Hoàn Hảo" là một cuốn sách chứa đựng những triết lý sâu sắc về cuộc sống, được viết bởi Đại Đức Hae Min – một nhà sư nổi tiếng đến từ Hàn Quốc. Cuốn sách này không chỉ là một cẩm nang hướng dẫn cách sống an nhiên giữa những bộn bề của cuộc đời mà còn là một lời động viên, an ủi dành cho những ai đang cảm thấy mệt mỏi, hoài nghi về bản thân.

                Cuốn sách bao gồm nhiều câu chuyện gần gũi, thực tế về những điều tưởng chừng nhỏ nhặt trong cuộc sống nhưng lại ảnh hưởng rất lớn đến tâm hồn mỗi người. Đại Đức Hae Min đã dùng ngôn từ nhẹ nhàng, sâu sắc để truyền tải thông điệp về sự yêu thương, chấp nhận chính mình và những người xung quanh, bất chấp những khiếm khuyết mà họ có.

                📌 Điểm đặc biệt của cuốn sách:
                ✔️ Văn phong nhẹ nhàng, dễ hiểu, phù hợp với mọi đối tượng độc giả.
                ✔️ Nội dung không chỉ là lý thuyết mà còn có nhiều ví dụ thực tế giúp người đọc dễ dàng áp dụng vào cuộc sống.
                ✔️ Lời khuyên hữu ích để cân bằng cảm xúc, giảm stress và sống hạnh phúc hơn.

                📌 Ai nên đọc cuốn sách này?
                👉 Những ai đang cảm thấy mất phương hướng trong cuộc sống.
                👉 Những người muốn tìm kiếm sự bình yên và an nhiên trong tâm hồn.
                👉 Những ai muốn cải thiện các mối quan hệ xung quanh mình.            </p>
        </div>
    );

    const warrantyInfo = (
        <div>
            <h3 className="text-xl font-bold mb-2">Thông tin bảo hành</h3>
            <p className="text-gray-700">Chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng nhất. Tuy nhiên, nếu bạn nhận được sản phẩm bị lỗi, không đúng với mô tả hoặc có bất kỳ vấn đề nào khác, chúng tôi sẵn sàng hỗ trợ bạn đổi trả theo các điều kiện sau:

                📌 1. Điều kiện áp dụng đổi trả
                ✅ Sản phẩm còn nguyên tem, chưa qua sử dụng, không bị rách hoặc hư hỏng do lỗi của khách hàng.
                ✅ Thời gian đổi trả trong vòng 7 ngày kể từ khi nhận hàng.
                ✅ Có đầy đủ hóa đơn mua hàng hoặc thông tin đơn hàng để xác minh.

                📌 2. Các trường hợp được đổi trả
                🔹 Sản phẩm bị lỗi do nhà sản xuất (sai nội dung, thiếu trang, in ấn kém chất lượng).
                🔹 Sản phẩm không đúng với đơn đặt hàng (sai tựa sách, sai số lượng).
                🔹 Hàng bị hư hỏng do quá trình vận chuyển (bị ướt, gãy góc, rách bìa).

                📌 3. Các trường hợp không được đổi trả
                ❌ Sách bị hư hỏng do khách hàng bảo quản không đúng cách (bị ướt, rách, ghi chú lên sách).
                ❌ Sách mua trong chương trình giảm giá đặc biệt hoặc các chương trình khuyến mãi không áp dụng đổi trả.
                ❌ Khách hàng không cung cấp được bằng chứng về lỗi sản phẩm.

                📌 4. Quy trình đổi trả
                🔹 Bước 1: Liên hệ với bộ phận chăm sóc khách hàng qua email hoặc hotline để gửi yêu cầu đổi trả.
                🔹 Bước 2: Gửi sản phẩm về kho hàng của chúng tôi theo địa chỉ được cung cấp.
                🔹 Bước 3: Sau khi kiểm tra sản phẩm, chúng tôi sẽ tiến hành đổi hàng mới hoặc hoàn tiền theo thỏa thuận với khách hàng.

                📌 5. Phương thức hoàn tiền
                ✔️ Hoàn tiền qua tài khoản ngân hàng (tối đa 5 ngày làm việc).
                ✔️ Hoàn tiền qua ví điện tử (ShopeePay, MoMo, ZaloPay).
                ✔️ Mã giảm giá cho đơn hàng tiếp theo nếu khách hàng đồng ý.

                📌 Liên hệ hỗ trợ:
                📞 Hotline: 
                📧 Email: </p>
        </div>
    );

    const shippingInfo = (
        <div>
            <h3 className="text-xl font-bold mb-2">Thông tin đóng gói, vận chuyển</h3>
            <p className="text-gray-700">
                Chúng tôi cam kết giao hàng nhanh chóng và đúng hẹn trên toàn quốc. Dưới đây là thông tin chi tiết về phương thức vận chuyển:

                📌 1. Thời gian giao hàng
                🚛 Nội thành TP.HCM & Hà Nội: 1-2 ngày
                🚛 Các tỉnh thành khác: 2-5 ngày
                🚛 Huyện đảo xa: 5-7 ngày

                📌 2. Chi phí giao hàng
                ✅ Nội thành TP.HCM & Hà Nội: 20.000 VNĐ (đối với đơn hàng dưới 2kg).
                ✅ Tỉnh thành khác: 32.000 VNĐ (đối với đơn hàng dưới 2kg).
                ✅ Phí phát sinh: Cộng thêm 2.000 - 3.000 VNĐ/kg nếu đơn hàng vượt quá 2kg.

                📌 3. Phương thức giao hàng
                ✔️ Giao hàng tiêu chuẩn (2-5 ngày).
                ✔️ Giao hàng hỏa tốc (1 ngày, chỉ áp dụng tại TP.HCM & Hà Nội).
                ✔️ Nhận hàng tại cửa hàng (miễn phí).

                📌 4. Lưu ý quan trọng
                🚨 Không giao hàng vào thứ 7, Chủ nhật và các ngày Lễ, Tết.
                🚨 Trường hợp không nhận được hàng do sai địa chỉ, khách hàng cần thanh toán phí giao lại.            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-600">
                <li><strong>Nội thành TP.HCM và Hà Nội:</strong> 1-2 ngày, 20.000đ/2kg đầu tiên, 2.000đ/kg tiếp theo.</li>
                <li><strong>Các tỉnh thành khác:</strong> 2-3 ngày, 32.000đ/2kg đầu tiên, 3.000đ/kg tiếp theo.</li>
            </ul>
        </div>
    );

    const sellerInfo = (
        <div>
            <h3 className="text-xl font-bold mb-2">Thông tin người bán</h3>
            <p className="text-gray-700">Nhà cung cấp: <strong>Đỗ Tài</strong></p>
            <p className="text-gray-600">Hỗ trợ: 123456860</p>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case "specification":
                return productDescription;
            case "warranty":
                return warrantyInfo;
            case "shipping":
                return shippingInfo;
            case "seller":
                return sellerInfo;
            default:
                return <p className="text-gray-500">Chọn một tab để xem thông tin</p>;
        }
    };

    return <div className="mt-5 p-4 border rounded-lg shadow-sm bg-white">{renderContent()}</div>;
}
