"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ShipmentContextType {
  isMapVisible: boolean;
  setIsMapVisible: (value: boolean) => void;
}

const ShipmentContext = createContext<ShipmentContextType | undefined>(
  undefined
);

export function ShipmentProvider({ children }: { children: ReactNode }) {
  const [isMapVisible, setIsMapVisible] = useState(true);

  return (
    <ShipmentContext.Provider value={{ isMapVisible, setIsMapVisible }}>
      {children}
    </ShipmentContext.Provider>
  );
}

export function useShipment() {
  const context = useContext(ShipmentContext);
  if (context === undefined) {
    throw new Error("useShipment must be used within a ShipmentProvider");
  }
  return context;
}
