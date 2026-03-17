import { useState } from "react";
import ProductTabContent from "./ProductTabContentTabProps";

const TABS = [
  { id: "specification", label: "Chi tiết sản phẩm" },
  { id: "warranty", label: "Chính sách đổi trả" },
  { id: "shipping", label: "Thông tin giao hàng" },
  { id: "seller", label: "Nhà cung cấp" },
];

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState('specification');

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex border-b border-slate-200">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 text-sm font-bold transition-all relative ${
              activeTab === tab.id 
                ? "text-blue-600" 
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 animate-in fade-in duration-300" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        <ProductTabContent activeTab={activeTab} />
      </div>
    </div>
  );
}
