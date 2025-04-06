import { useState } from "react";
import { ProductTabContentTabProps } from "..";

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState('specification');
  return (<>
    <div className="  gap-10 border-2">
      <div className="flex-grow border-b-2 flex items-center text-center">
        {[
          { id: "specification", label: "Chi tiết sản phẩm" },
          { id: "warranty", label: "Chính sách đổi trả" },
          { id: "shipping", label: "Thông tin giao hàng" },
          { id: "seller", label: "Nhà cung cấp" },
        ].map((tab) => (
          <div key={tab.id}
            className={`cursor-pointer flex-grow text-center p-2 ${activeTab === tab.id ? "border-4 border-blue-500 font-bold text-sm bg-blue-500" : "text-sm font-bold"
              }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </div>
        ))

        }
      </div>
        <ProductTabContentTabProps activeTab={activeTab} />

    </div>

  </>
  );
}
