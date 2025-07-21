import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import BookingCard from '@/components/bookings/BookingCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { bookingAPI } from '@/services/api';
import { Booking } from '@/types';
import { ClipboardList } from 'lucide-react';
import { differenceInCalendarDays } from 'date-fns';

export default function Bookings() {
  const { authState } = useAuth();
  const [active, setActive] = useState<Booking[]>([]);
  const [past, setPast] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    if (!authState.user?.email) return;

    setLoading(true);
    bookingAPI
      .getUserBookingsByEmail(authState.user.email)
      .then((res) => {
        const all: Booking[] = res.data;
        const today = new Date();

        const activeBookings = all
          .filter((b) => b.bookingStatus !== 'CANCELLED')
          .map((b) => ({
            ...b,
            totalDays:
              differenceInCalendarDays(new Date(b.endDate), new Date(b.startDate)) || 1,
            daysLeft: differenceInCalendarDays(new Date(b.endDate), today),
          }));

        const pastBookings = all
          .filter((b) => b.bookingStatus === 'PAID' || b.bookingStatus === 'PENDING_PAYMENT')

          .map((b) => ({
            ...b,
            totalDays:
              differenceInCalendarDays(new Date(b.endDate), new Date(b.startDate)) || 1,
            daysLeft: differenceInCalendarDays(new Date(b.endDate), today),
          }));

        setActive(activeBookings);
        setPast(pastBookings);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, [authState.user?.email]);

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-10 text-lg text-gray-500">Loading…</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-rental-blue mb-6">My Bookings</h1>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="active">Active ({active.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {active.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {active.map((b) => (
                  <BookingCard
                    booking={b}
                    key={`${b.id}-${b.bookingStatus}`}
                    onStatusChange={fetchBookings}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-10">
                <ClipboardList className="mx-auto mb-4 w-10 h-10" />
                No active bookings found.
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            {past.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {past.map((b) => (
                  <BookingCard
                    booking={b}
                    key={`${b.id}-${b.bookingStatus}`}
                    onStatusChange={fetchBookings}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-10">
                <ClipboardList className="mx-auto mb-4 w-10 h-10" />
                No past bookings found.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
