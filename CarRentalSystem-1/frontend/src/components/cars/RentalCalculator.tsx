import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import axios from 'axios';

interface RentalCalculatorProps {
  pricePerDay: number;
  carId: number;
}

interface FareBreakdown {
  baseFare: number;
  allowedKm: number;
  totalKmDriven: number;
  extraKm: number;
  extraKmCharge: number;
  extraKmRate: number;
  lateHours: number;
  remainingLateHours: number;
  lateHourCharge: number;
  lateHourRate: number;
  extraLateDays: number;
  extraLateDayFare: number;
  lateDayRate: number;
  totalFare: number;
}

const RentalCalculator = ({ pricePerDay, carId }: RentalCalculatorProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [kmTravelled, setKmTravelled] = useState<number>(0);
  const [lateHours, setLateHours] = useState<number>(0);
  const [fareDetails, setFareDetails] = useState<FareBreakdown | null>(null);

  const handleCalculateFare = async () => {
    if (!startDate || !endDate) return;

    const payload = {
      carId,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      totalKmDriven: kmTravelled,
      lateHours,
    };

    try {
      const res = await axios.post<FareBreakdown>(
        'http://localhost:8080/api/fare/estimate',
        payload
      );
      setFareDetails(res.data);
    } catch (error: any) {
      alert(
        'Error calculating fare: ' +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Rental Fare Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Date Pickers */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Start Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !startDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, 'PPP') : 'Pick date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">End Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !endDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, 'PPP') : 'Pick date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  disabled={(date) =>
                    date < new Date() || (startDate && date < startDate)
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Kilometers Travelled
            </label>
            <input
              type="number"
              value={kmTravelled}
              onChange={(e) => setKmTravelled(Number(e.target.value))}
              className="w-full border rounded px-2 py-1"
              min={0}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hours Late</label>
            <input
              type="number"
              value={lateHours}
              onChange={(e) => setLateHours(Number(e.target.value))}
              className="w-full border rounded px-2 py-1"
              min={0}
            />
          </div>
        </div>

        {/* Action */}
        <Button
          className="w-full"
          onClick={handleCalculateFare}
          disabled={!startDate || !endDate}
        >
          Calculate Fare
        </Button>

        {/* Results */}
        {fareDetails && (
          <div className="mt-4 p-4 bg-muted rounded-lg space-y-2 text-sm">
            <div className="flex justify-between text-blue-700 font-bold">
              <span>Base Fare:</span>
              <span>₹{fareDetails.baseFare}</span>
            </div>
            <div className="flex justify-between">
              <span>Allowed KM:</span>
              <span>{fareDetails.allowedKm} km</span>
            </div>
            <div className="flex justify-between">
              <span>Total KM Travelled:</span>
              <span>{fareDetails.totalKmDriven} km</span>
            </div>
            <div className="flex justify-between text-blue-700 font-bold">
              <span>Extra KM:</span>
              <span>{fareDetails.extraKm} km</span>
            </div>
            <div className="flex justify-between">
              <span>Price per Extra KM:</span>
              <span>₹{fareDetails.extraKmRate}</span>
            </div>
            <div className="flex justify-between text-blue-700 font-bold">
              <span>Extra KM Charges:</span>
              <span>₹{fareDetails.extraKmCharge}</span>
            </div>
            <div className="flex justify-between">
              <span>Late Duration:</span>
              <span>
                {fareDetails.extraLateDays} day(s){' '}
                {fareDetails.remainingLateHours} hour(s)
              </span>
            </div>
            <div className="flex justify-between text-blue-700 font-bold">
              <span>Late Charges Per Day:</span>
              <span>
                ₹{fareDetails.lateDayRate} (₹{pricePerDay} + ₹
                {pricePerDay * 0.5})
              </span>
            </div>
            <div className="flex justify-between text-blue-700 font-bold">
              <span>Total Late Day Charges:</span>
              <span>₹{fareDetails.extraLateDayFare}</span>
            </div>
            <div className="flex justify-between">
              <span>Price per Late Hour:</span>
              <span>₹{fareDetails.lateHourRate}</span>
            </div>
            <div className="flex justify-between text-blue-700 font-bold">
              <span>Extra Late Hour Charges:</span>
              <span>₹{fareDetails.lateHourCharge}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold text-base text-green-600">
              <span>Total Estimated Fare:</span>
              <span>₹{fareDetails.totalFare}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RentalCalculator;
