import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Booking } from '@/types';
import { toast } from '@/components/ui/sonner';
import { bookingAPI } from '@/services/api';
import { Badge } from '@/components/ui/badge';

interface Props {
  booking: Booking & {
    daysLeft?: number;
    totalDays?: number;
  };
  onStatusChange?: () => void;
}

export default function BookingCard({ booking, onStatusChange }: Props) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Hook for navigation

  const handleCancel = async () => {
    try {
      setLoading(true);
      await bookingAPI.updateBooking(booking.id.toString(), {
        status: 'CANCELLED',
      });
      toast.success('Booking cancelled successfully');
      if (onStatusChange) onStatusChange();
    } catch (err) {
      toast.error('Failed to cancel booking');
    } finally {
      setLoading(false);
    }
  };

  const canCancel =
    booking.daysLeft === booking.totalDays && booking.bookingStatus !== 'CANCELLED';

  const isCancelled = booking.bookingStatus === 'CANCELLED';

  const handleBookAgain = () => {
    if (booking.car && 'id' in booking.car && booking.car.id) {
      navigate(`/cars/${booking.car.id}`);
    } else {
      toast.error('Car ID not found');
    }
  };

  return (
    <Card
      className={`transition-all ${
        isCancelled ? 'bg-gray-100 text-gray-500 opacity-80' : ''
      }`}
    >
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              {booking.car.brand} {booking.car.model} ({booking.totalDays} days)
            </h3>
            {isCancelled && <Badge variant="destructive">❌ Cancelled</Badge>}
          </div>
          <p>Total Fare: ₹{booking.totalFare}</p>
          <p>Status: {booking.bookingStatus}</p>
          <p>Days Left: {booking.daysLeft}</p>
        </div>
      </CardContent>

      <CardFooter>
        {canCancel && (
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleCancel}
            disabled={loading}
          >
            {loading ? 'Cancelling…' : 'Cancel Booking'}
          </Button>
        )}

        {isCancelled && (
          <Button
            variant="secondary"
            className="w-full"
            onClick={handleBookAgain}
          >
            Book Again
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
