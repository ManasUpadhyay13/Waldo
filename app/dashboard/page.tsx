import { ShipmentTable } from "@/components/dashboard/ShipmentTable";
import { ShipmentTracker } from "@/components/dashboard/ShipmentTracker";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome back, Max
            </h1>
            <p className="text-gray-600 mt-1">
              Here&apos;s what&apos;s happening with your store today.
            </p>
          </div>

          <div className="relative"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Units Packed"
            value="831,071"
            percentageChange={13}
            timeframe="+7k today"
          />
          <StatsCard
            title="Total shipments"
            value="831,071"
            percentageChange={13}
            timeframe="+7k today"
          />
          <StatsCard
            title="Active shipments"
            value="831,071"
            percentageChange={13}
            timeframe="+7k today"
          />
          <StatsCard
            title="Delivered shipments"
            value="831,071"
            percentageChange={13}
            timeframe="+7k today"
          />
        </div>

        {/* Shipment Tracking Section */}
        <ShipmentTracker />

        {/* Tracking Order Table */}
        <ShipmentTable />
      </div>
    </DashboardLayout>
  );
}
