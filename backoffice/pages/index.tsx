import DashboardLayout from "./Layout";

export default function AdminHome() {
  return (
    <DashboardLayout title="Bảng điều khiển">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Đơn hàng mới" value="128" color="bg-indigo-500" />
        <StatCard title="Doanh thu" value="45.000.000đ" color="bg-emerald-500" />
        <StatCard title="Sản phẩm hết hàng" value="12" color="bg-rose-500" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Hoạt động gần đây</h3>
        <p className="text-slate-500 text-sm">Chưa có dữ liệu mới để hiển thị.</p>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, color }: { title: string, value: string, color: string }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 ${color} rounded-xl flex-shrink-0`} />
            <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</p>
                <p className="text-2xl font-black text-slate-900">{value}</p>
            </div>
        </div>
    );
}