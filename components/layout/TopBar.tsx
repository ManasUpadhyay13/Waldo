import { Input } from "@/components/ui/input";
import { Search, Bell } from "lucide-react";

export const TopBar = () => {
  return (
    <div className="h-16 border-b border-gray-200 bg-white px-8 flex items-center justify-between">
      <div className="flex items-center flex-1">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-gray-50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-gray-100 rounded-full">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">M</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Maxbert</p>
          </div>
        </div>
      </div>
    </div>
  );
};
