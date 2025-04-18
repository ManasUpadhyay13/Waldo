import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  percentageChange: number;
  timeframe: string;
  className?: string;
}

export const StatsCard = ({
  title,
  value,
  percentageChange,
  timeframe,
  className,
}: StatsCardProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg p-6 border border-gray-200",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <button className="p-2 hover:bg-gray-50 rounded-lg">
          {/* Add your icon here */}
        </button>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center text-emerald-500">
              <ArrowUpRight size={16} />
              <span className="text-sm font-medium">{percentageChange}%</span>
            </div>
            <span className="text-gray-500 text-sm">{timeframe}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
