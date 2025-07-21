import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { CarFilters as CarFiltersType } from '@/types';
import { X } from 'lucide-react';
import axios from 'axios';

interface CarFiltersProps {
  filters: CarFiltersType;
  setFilters: (filters: CarFiltersType) => void;
}

const CarFilters = ({ filters, setFilters }: CarFiltersProps) => {
  const [carTypes, setCarTypes] = useState<string[]>([]);
  const [fuelTypes, setFuelTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([1000, 10000]);
  const [priceLimits, setPriceLimits] = useState<{ min: number; max: number }>({ min: 1000, max: 10000 });
  const [step, setStep] = useState<number>(100);

  useEffect(() => {
    axios.get('http://localhost:8080/api/cars/filters/meta')
      .then(res => {
        setCarTypes(res.data.carTypes || []);
        setFuelTypes(res.data.fuelTypes || []);

        const range = res.data.priceRange || { min: 1000, max: 10000, step: 100 };
        setPriceLimits({ min: range.min, max: range.max });
        setStep(range.step);
        setPriceRange([
          filters.minPrice ?? range.min,
          filters.maxPrice ?? range.max,
        ]);
      })
      .catch(err => {
        console.error('Failed to load filter metadata', err);
      });
  }, []);

  const handleSingleSelect = <T extends string>(key: keyof CarFiltersType, value: T) => {
    setFilters({
      ...filters,
      [key]: filters[key] === value ? undefined : value,
    });
  };

  const handleFuelSelect = (fuel: string) => {
    const fuelUpper = fuel.toUpperCase();
    setFilters({
      ...filters,
      fuelType: filters.fuelType === fuelUpper ? undefined : fuelUpper,
    });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    setFilters({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1],
    });
  };

  const resetFilters = () => {
    setFilters({});
    axios.get('http://localhost:8080/api/cars/filters/meta')
      .then(res => {
        const range = res.data.priceRange || { min: 1000, max: 10000, step: 100 };
        setPriceLimits({ min: range.min, max: range.max });
        setStep(range.step);
        setPriceRange([range.min, range.max]);
      });
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== undefined);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-sm">
            <X className="h-4 w-4 mr-1" /> Clear All
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={['type', 'price', 'fuel']}>
        {/* Vehicle Type */}
        <AccordionItem value="type">
          <AccordionTrigger className="text-base font-medium">Vehicle Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {carTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.carType === type}
                    onCheckedChange={() => handleSingleSelect('carType', type)}
                  />
                  <Label htmlFor={`type-${type}`} className="text-sm">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <Slider
                value={priceRange}
                min={priceLimits.min}
                max={priceLimits.max}
                step={step}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between">
                <span className="text-sm font-medium">₹{priceRange[0]}</span>
                <span className="text-sm font-medium">₹{priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Fuel Type */}
        <AccordionItem value="fuel">
          <AccordionTrigger className="text-base font-medium">Fuel Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {fuelTypes.map((fuelType) => (
                <div key={fuelType} className="flex items-center space-x-2">
                  <Checkbox
                    id={`fuel-${fuelType}`}
                    checked={filters.fuelType === fuelType.toUpperCase()}
                    onCheckedChange={() => handleFuelSelect(fuelType)}
                  />
                  <Label htmlFor={`fuel-${fuelType}`} className="text-sm">
                    {fuelType}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CarFilters;
