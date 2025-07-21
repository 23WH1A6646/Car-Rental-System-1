import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Car {
  id: number;
  brandModel: string;
  carType: string;
  fuelType: string;
  pricePerDay: number;
}

interface User {
  email: string;
  name: string;
}

type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

interface Booking {
  id: number;
  startDate: string;
  endDate: string;
  totalFare: number;
  bookingStatus: BookingStatus;
  car: Car;
  user: User;
  [key: string]: any;
}

const StatusBadge = ({ status }: { status: BookingStatus }) => {
  const base = "text-white px-2 py-1 rounded text-sm font-semibold";
  switch (status) {
    case "CONFIRMED":
      return <span className={`${base} bg-green-600`}>🟢 Confirmed</span>;
    case "CANCELLED":
      return <span className={`${base} bg-red-600`}>🔴 Cancelled</span>;
    case "PENDING":
      return <span className={`${base} bg-yellow-500 text-black`}>🟡 Pending</span>;
    default:
      return <span className={base}>{status}</span>;
  }
};

const AdminBookingManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState<"ALL" | BookingStatus>("ALL");

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/bookings");
      setBookings(res.data);
    } catch (error: any) {
      toast({
        title: "❌ Error fetching bookings",
        description: error?.response?.data?.message || error?.message,
      });
    }
  };

  const updateStatus = async (id: number, status: BookingStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/bookings/${id}/status`, { status });
      toast({ title: `✅ Booking #${id} updated to ${status}` });
      fetchBookings();
    } catch (error: any) {
      toast({
        title: "❌ Error updating status",
        description: error?.response?.data?.message || error?.message,
      });
    }
  };

  const deleteBooking = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/bookings/${id}`);
      toast({ title: `🗑️ Booking #${id} deleted` });
      fetchBookings();
    } catch (error: any) {
      toast({
        title: "❌ Error deleting booking",
        description: error?.response?.data?.message || error?.message,
      });
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings =
    statusFilter === "ALL"
      ? bookings
      : bookings.filter((booking) => booking.bookingStatus === statusFilter);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black-700">📑 Booking Management</h1>
        <div className="flex flex-col">
          <label htmlFor="status-select" className="text-sm font-medium mb-1">Filter by Status:</label>
          <Select onValueChange={(value) => setStatusFilter(value as any)} value={statusFilter}>
            <SelectTrigger className="w-[200px]" id="status-select">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="CONFIRMED">Confirmed</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <p>No bookings found for selected status.</p>
      ) : (
        filteredBookings.map((booking) => (
          <div key={booking.id} className="bg-white border border-gray-200 shadow-sm p-4 mb-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-800">
                Booking #{booking.id} - {booking.car?.brandModel}
              </h2>
              <StatusBadge status={booking.bookingStatus} />
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>User:</strong> {booking.user?.name} ({booking.user?.email})</p>
              <p><strong>Dates:</strong> {booking.startDate} ➡ {booking.endDate}</p>
              <p><strong>Total Fare:</strong> ₹{booking.totalFare}</p>
            </div>

            <div className="mt-3 flex gap-2">
              {(booking.bookingStatus === "PENDING" || booking.bookingStatus === "CANCELLED") && (
                <Button onClick={() => updateStatus(booking.id, "CONFIRMED")} variant="default">
                  ✅ Approve
                </Button>
              )}

              {booking.bookingStatus !== "CANCELLED" && (
                <Button onClick={() => updateStatus(booking.id, "CANCELLED")} variant="destructive">
                  ❌ Cancel
                </Button>
              )}

              <Button onClick={() => deleteBooking(booking.id)} variant="outline">
                🗑️ Delete
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminBookingManagement;
