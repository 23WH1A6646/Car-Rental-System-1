import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarIcon, SearchIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

const CarSearchBar = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const handleSearch = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Please select both pick-up and return dates.",
        variant: "destructive",
      });
      return;
    }

    const queryParams = new URLSearchParams();
    queryParams.append("startDate", format(startDate, "yyyy-MM-dd"));
    queryParams.append("endDate", format(endDate, "yyyy-MM-dd"));

    navigate(`/cars?${queryParams.toString()}`);
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-lg flex flex-col md:flex-row md:items-end gap-4">
      {/* Pick-up Date */}
      <div className="flex-1 space-y-1">
        <label className="text-sm font-medium text-gray-700">Pick-up Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-between text-left font-normal",
                startDate ? "text-gray-900" : "text-muted-foreground"
              )}
            >
              {startDate ? format(startDate, "PPP") : "Select date"}
              <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
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

      {/* Return Date */}
      <div className="flex-1 space-y-1">
        <label className="text-sm font-medium text-gray-700">Return Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-between text-left font-normal",
                endDate ? "text-gray-900" : "text-muted-foreground"
              )}
            >
              {endDate ? format(endDate, "PPP") : "Select date"}
              <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              initialFocus
              disabled={(date) =>
                startDate ? date < startDate : date < new Date()
              }
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Search Button */}
      <Button className="h-10 px-8 mt-6 md:mt-0" onClick={handleSearch}>
        <SearchIcon className="h-4 w-4 mr-2" />
        Search Cars
      </Button>
    </div>
  );
};

export default CarSearchBar;
