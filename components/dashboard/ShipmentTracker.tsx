"use client";

import { Truck } from "lucide-react";
import dynamic from "next/dynamic";
// Dynamically import the Map components with no SSR and move it to a separate component
const Map = dynamic(
  () => import("../dashboard/Map").then((mod) => mod.default),
  {
    ssr: false,
  }
);

interface ShipmentLocationProps {
  shipmentNumber: string;
  pickupLocation: string;
  dropoffLocation: string;
}

const ShipmentLocation = ({
  shipmentNumber,
  pickupLocation,
  dropoffLocation,
}: ShipmentLocationProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500">Shipment Number</p>
          <p className="text-lg font-semibold">{shipmentNumber}</p>
        </div>
        <Truck className="h-12 w-12 text-gray-400" />
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
          <div>
            <p className="text-sm text-gray-500">Pickup location</p>
            <p className="text-gray-700">{pickupLocation}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
          <div>
            <p className="text-sm text-gray-500">Drop off location</p>
            <p className="text-gray-700">{dropoffLocation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ShipmentTracker = () => {
  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">In Transit Shipments</h2>
        <ShipmentLocation
          shipmentNumber="831,071"
          pickupLocation="1070 street st yard main glasco, san Francisco"
          dropoffLocation="1070 street st yard main glasco, san Francisco"
        />
        <ShipmentLocation
          shipmentNumber="831,071"
          pickupLocation="1070 street st yard main glasco, san Francisco"
          dropoffLocation="1070 street st yard main glasco, san Francisco"
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">On the Way</h2>
        <Map />

        <div className="grid grid-cols-5 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-500">Category</p>
            <p className="font-medium">Electronics</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Distance</p>
            <p className="font-medium">120KM</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Estimation</p>
            <p className="font-medium">24 h</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Weight</p>
            <p className="font-medium">10kg</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fee</p>
            <p className="font-medium">$1000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

declare module "leaflet" {
  export interface MapOptions {
    preferCanvas?: boolean;
  }
}
