"use client";

import { Truck, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import type {
  MapContainer as MapContainerType,
  TileLayer,
  ZoomControl,
  Marker,
} from "react-leaflet";
import type L from "leaflet";

// Dynamically import the Map components with no SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayerComponent = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const ZoomControlComponent = dynamic(
  () => import("react-leaflet").then((mod) => mod.ZoomControl),
  { ssr: false }
);

const MarkerComponent = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
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

const MapComponent = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Create custom icon using Lucide icon as HTML
  const createCustomIcon = (color: string) => {
    if (typeof window === "undefined") return null;

    const L = require("leaflet");
    return L.divIcon({
      html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
      className: "custom-marker",
      iconSize: [24, 24],
      iconAnchor: [12, 24],
    });
  };

  // Sample delivery points
  const deliveryPoints = [
    { position: [51.5074, -0.1278], name: "London", color: "#3B82F6" },
    { position: [55.9533, -3.1883], name: "Edinburgh", color: "#8B5CF6" },
  ];

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Only render the map on the client side
  if (typeof window === "undefined") {
    return (
      <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return (
    <div
      className={`relative ${
        isFullscreen ? "fixed inset-0 z-50 bg-white" : "h-[300px]"
      }`}
    >
      <button
        onClick={toggleFullscreen}
        className="absolute top-2 right-2 z-10 bg-white px-3 py-1 rounded-md shadow-md text-sm"
      >
        {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
      </button>
      <MapContainer
        center={[54.5, -2]}
        zoom={5}
        className="h-full w-full rounded-lg"
        zoomControl={false}
      >
        <TileLayerComponent
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControlComponent position="bottomright" />

        {deliveryPoints.map((point, index) => (
          <MarkerComponent
            key={index}
            position={point.position as L.LatLngExpression}
            icon={createCustomIcon(point.color)}
          />
        ))}
      </MapContainer>
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
        <MapComponent />

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
