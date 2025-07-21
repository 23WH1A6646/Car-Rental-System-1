// Updated: Redirects to /payment after booking

import { useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import {
  Card,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { bookingAPI } from '@/services/api.ts';

interface Props {
  carId: number;
  pricePerDay: number;
  isAvailable: boolean;
  isAuthenticated: boolean;
}

export default function CarBookingForm({
  carId,
  pricePerDay,
  isAvailable,
  isAuthenticated,
}: Props) {
  const { authState } = useAuth();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateTotal = () => {
    if (!startDate || !endDate) return pricePerDay;
    const days = differenceInDays(endDate, startDate);
    const validDays = days > 0 ? days : 1;
    return validDays * pricePerDay;
  };

  const handleBook = async () => {
  if (!authState.user) {
    toast.error('Please log in to book.');
    return navigate('/login');
  }

  if (!startDate || !endDate) {
    toast.error('Please select both pickup and return dates.');
    return;
  }

  setIsProcessing(true);
  try {
    const res = await bookingAPI.createBooking({
      email: authState.user.email,
      carId,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    });
    toast.success('Booking initiated. Redirecting to payment...');
    navigate(`/payment/${res.data.id}/${calculateTotal()}`);
  } catch (err: any) {
    toast.error(err?.response?.data?.message || 'Booking failed');
  } finally {
    setIsProcessing(false);
  }
};

  return (
    <Card className="shadow-lg border-0">
      <CardContent className="space-y-4">
        {/* Start Date Picker */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Pickup Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, 'PPP') : 'Select pickup date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date Picker */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Return Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, 'PPP') : 'Select return date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                disabled={(date) => date < (startDate || new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Price Summary */}
        <div className="flex justify-between border-t pt-2 text-lg font-semibold">
          <span>Total:</span>
          <span>₹{calculateTotal()}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          onClick={handleBook}
          disabled={!isAvailable || isProcessing}
        >
          {isProcessing ? 'Booking...' : 'Book Now'}
        </Button>
      </CardFooter>
    </Card>
  );
}
