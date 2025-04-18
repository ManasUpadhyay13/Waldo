"use client";

import { MapContainer, TileLayer, ZoomControl, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useShipment } from "@/contexts/ShipmentContext";

interface MapProps {
  // Add any props if needed
}

const Map: React.FC<MapProps> = () => {
  const { isMapVisible } = useShipment();

  // Create custom icon using Lucide icon as HTML
  const createCustomIcon = (color: string) => {
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

  return (
    <div className="h-[300px]">
      <MapContainer
        center={[54.5, -2]}
        zoom={5}
        className="h-full w-full rounded-lg"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />

        {deliveryPoints.map((point, index) => (
          <Marker
            key={index}
            position={point.position as L.LatLngExpression}
            icon={createCustomIcon(point.color)}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
