"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Download, Pencil, Trash } from "lucide-react";
import { useShipment } from "@/contexts/ShipmentContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ShipmentData {
  productId: string;
  type: string;
  arrivalTime: string;
  weight: string;
  route: {
    from: string;
    to: string;
  };
  fee: string;
  status: "Delivered" | "In Transit" | "Pending";
}

const defaultShipment: ShipmentData = {
  productId: "",
  type: "electronics",
  arrivalTime: "2024-03-25",
  weight: "25 KG",
  route: {
    from: "London",
    to: "Edinburgh",
  },
  fee: "$2000",
  status: "Pending",
};

const initialShipments: ShipmentData[] = [
  {
    productId: "9256821912-FE",
    type: "electronics",
    arrivalTime: "2024-03-25",
    weight: "25 KG",
    route: {
      from: "London",
      to: "Manchester",
    },
    fee: "$2000",
    status: "In Transit",
  },
  {
    productId: "7834567123-AB",
    type: "furniture",
    arrivalTime: "2024-03-28",
    weight: "150 KG",
    route: {
      from: "Edinburgh",
      to: "Glasgow",
    },
    fee: "$3500",
    status: "Pending",
  },
  {
    productId: "4567891234-CD",
    type: "medical supplies",
    arrivalTime: "2024-03-22",
    weight: "10 KG",
    route: {
      from: "Birmingham",
      to: "Liverpool",
    },
    fee: "$1500",
    status: "Delivered",
  },
];

export const ShipmentTable = () => {
  const { setIsMapVisible } = useShipment();
  const [shipments, setShipments] = useState<ShipmentData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentShipment, setCurrentShipment] =
    useState<ShipmentData>(defaultShipment);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedShipments = localStorage.getItem("shipments");
    if (savedShipments) {
      setShipments(JSON.parse(savedShipments));
    } else {
      // If no data in localStorage, use initial shipments
      setShipments(initialShipments);
    }
  }, []);

  // Save to localStorage whenever shipments change
  useEffect(() => {
    localStorage.setItem("shipments", JSON.stringify(shipments));
  }, [shipments]);

  // Update the useEffect to handle map visibility
  useEffect(() => {
    if (isOpen) {
      setIsMapVisible(false);
    } else {
      setIsMapVisible(true);
    }
  }, [isOpen, setIsMapVisible]);

  // Add new useEffect for delete dialog
  useEffect(() => {
    if (deleteId) {
      setIsMapVisible(false);
    } else {
      // Only show map if neither dialog is open
      if (!isOpen) {
        setIsMapVisible(true);
      }
    }
  }, [deleteId, isOpen, setIsMapVisible]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setShipments(
        shipments.map((s) =>
          s.productId === currentShipment.productId ? currentShipment : s
        )
      );
    } else {
      const newId = `SHIP-${shipments.length + 1}-${Date.now()
        .toString()
        .slice(-4)}`;
      setShipments([
        ...shipments,
        {
          ...currentShipment,
          productId: newId,
        },
      ]);
    }
    setIsOpen(false);
    setCurrentShipment(defaultShipment);
    setIsEditing(false);
  };

  const handleEdit = (shipment: ShipmentData) => {
    setCurrentShipment(shipment);
    setIsEditing(true);
    setIsOpen(true);
  };

  const downloadCSV = () => {
    const headers = [
      "Product ID",
      "Type",
      "Arrival Time",
      "Weight",
      "From",
      "To",
      "Fee",
      "Status",
    ];
    const csvData = shipments.map((s) => [
      s.productId,
      s.type,
      s.arrivalTime,
      s.weight,
      s.route.from,
      s.route.to,
      s.fee,
      s.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "shipments.csv";
    link.click();
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      setShipments(shipments.filter((s) => s.productId !== deleteId));
      setDeleteId(null);
      setIsMapVisible(true); // Show map after deletion
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Tracking Order</h2>
        <div className="flex gap-2">
          <Dialog
            open={isOpen}
            onOpenChange={(open) => {
              setIsOpen(open);
              if (!open) {
                setCurrentShipment(defaultShipment);
                setIsEditing(false);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button className="cursor-pointer">
                <Plus className="h-4 w-4 mr-2" />
                Add Shipment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] z-[9999]">
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? "Edit Shipment" : "Add New Shipment"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <Input
                      value={currentShipment.type}
                      onChange={(e) =>
                        setCurrentShipment({
                          ...currentShipment,
                          type: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Arrival Time</label>
                    <Input
                      type="date"
                      value={currentShipment.arrivalTime}
                      onChange={(e) =>
                        setCurrentShipment({
                          ...currentShipment,
                          arrivalTime: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Weight</label>
                    <Input
                      value={currentShipment.weight}
                      onChange={(e) =>
                        setCurrentShipment({
                          ...currentShipment,
                          weight: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fee</label>
                    <Input
                      value={currentShipment.fee}
                      onChange={(e) =>
                        setCurrentShipment({
                          ...currentShipment,
                          fee: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">From</label>
                    <Input
                      value={currentShipment.route.from}
                      onChange={(e) =>
                        setCurrentShipment({
                          ...currentShipment,
                          route: {
                            ...currentShipment.route,
                            from: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">To</label>
                    <Input
                      value={currentShipment.route.to}
                      onChange={(e) =>
                        setCurrentShipment({
                          ...currentShipment,
                          route: {
                            ...currentShipment.route,
                            to: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <select
                      className="w-full border rounded-md p-2"
                      value={currentShipment.status}
                      onChange={(e) =>
                        setCurrentShipment({
                          ...currentShipment,
                          status: e.target.value as ShipmentData["status"],
                        })
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
                <Button type="submit" className="w-full cursor-pointer">
                  {isEditing ? "Update" : "Add"} Shipment
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            onClick={downloadCSV}
            className="cursor-pointer"
          >
            <Download className="h-4 w-4 mr-2" />
            Download CSV
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>PRODUCT ID</TableHead>
            <TableHead>TYPE</TableHead>
            <TableHead>ARRIVAL TIME</TableHead>
            <TableHead>WEIGHT</TableHead>
            <TableHead>ROUTE</TableHead>
            <TableHead>FEE</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shipments.map((shipment) => (
            <TableRow key={shipment.productId}>
              <TableCell className="font-medium">
                {shipment.productId}
              </TableCell>
              <TableCell>
                <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                  {shipment.type}
                </span>
              </TableCell>
              <TableCell>{shipment.arrivalTime}</TableCell>
              <TableCell>{shipment.weight}</TableCell>
              <TableCell>{`${shipment.route.from} → ${shipment.route.to}`}</TableCell>
              <TableCell>{shipment.fee}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-md text-sm ${
                    shipment.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : shipment.status === "In Transit"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {shipment.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(shipment)}
                    className="cursor-pointer"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDeleteId(shipment.productId)}
                    className="cursor-pointer text-red-600 hover:text-red-700"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteId(null);
            if (!isOpen) {
              // Only show map if add/edit dialog is also closed
              setIsMapVisible(true);
            }
          }
        }}
      >
        <AlertDialogContent className="z-[9999]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              shipment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="cursor-pointer"
              onClick={() => {
                setDeleteId(null);
                if (!isOpen) {
                  // Only show map if add/edit dialog is also closed
                  setIsMapVisible(true);
                }
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 cursor-pointer"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
