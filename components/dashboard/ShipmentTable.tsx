import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const shipments: ShipmentData[] = [
  {
    productId: "9256821912-FE",
    type: "electronics",
    arrivalTime: "4/13/2025",
    weight: "25 KG",
    route: {
      from: "San Francisco",
      to: "New York",
    },
    fee: "$2000",
    status: "Delivered",
  },
  // Add more shipment data as needed
];

export const ShipmentTable = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Tracking Order</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>PRODUCT ID</TableHead>
            <TableHead>TYPE</TableHead>
            <TableHead>ARRIVAL TIME</TableHead>
            <TableHead>WEIGHT</TableHead>
            <TableHead>ROUTE</TableHead>
            <TableHead>FEE</TableHead>
            <TableHead>Status</TableHead>
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
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {shipment.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
