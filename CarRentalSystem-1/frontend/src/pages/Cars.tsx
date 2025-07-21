import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CarCard from '@/components/cars/CarCard';
import CarFilters from '@/components/cars/CarFilters';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Car as CarType, CarFilters as CarFiltersType } from '@/types';
import { Filter, SlidersHorizontal, Grid2X2, LayoutList, X, Star, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import axios from 'axios';

const Cars = () => {
  const isMobile = useIsMobile();
  const [showFilters, setShowFilters] = useState(!isMobile);
  const [filteredCars, setFilteredCars] = useState<CarType[]>([]);
  const [filters, setFilters] = useState<CarFiltersType>({});
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const fetchCars = async () => {
    try {
      const requestPayload = {
        carType: filters.carType || null,
        fuelType: filters.fuelType || null,
        minPrice: filters.minPrice || null,
        maxPrice: filters.maxPrice || null,
      };

      const response = await axios.post<CarType[]>(
        'http://localhost:8080/api/cars/filter',
        requestPayload
      );
      setFilteredCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [filters]);

  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          {/* Page Title with sparkle */}
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-blue-500 h-6 w-6" />
            <h1 className="text-3xl font-bold text-rental-blue animate-fade-in">Find Your Perfect Ride</h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filter toggle for mobile */}
            {isMobile && (
              <div className="w-full flex justify-between items-center mb-4">
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant={view === 'grid' ? 'default' : 'ghost'} size="icon" onClick={() => setView('grid')}>
                    <Grid2X2 className="h-4 w-4" />
                  </Button>
                  <Button variant={view === 'list' ? 'default' : 'ghost'} size="icon" onClick={() => setView('list')}>
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Filters */}
            {showFilters && (
              <div className={`${isMobile ? 'fixed inset-0 z-50 bg-white p-4 overflow-auto' : 'lg:w-1/4'} rounded-xl shadow-md bg-white`}>
                {isMobile && (
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                )}
                <CarFilters filters={filters} setFilters={setFilters} />
                {isMobile && (
                  <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
                    <Button className="w-full" onClick={() => setShowFilters(false)}>
                      Show {filteredCars.length} Results
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Car listing */}
            <div className={`${showFilters && !isMobile ? 'lg:w-3/4' : 'w-full'}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-1">
                  <Star className="text-yellow-400 h-5 w-5" />
                  {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'} available
                </h2>

                {!isMobile && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 mr-2">View:</span>
                    <Button variant={view === 'grid' ? 'default' : 'ghost'} size="icon" onClick={() => setView('grid')}>
                      <Grid2X2 className="h-4 w-4" />
                    </Button>
                    <Button variant={view === 'list' ? 'default' : 'ghost'} size="icon" onClick={() => setView('list')}>
                      <LayoutList className="h-4 w-4" />
                    </Button>
                    <Separator orientation="vertical" className="h-6 mx-2" />
                    <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </Button>
                  </div>
                )}
              </div>

              {filteredCars.length > 0 ? (
                <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
                  {filteredCars.map((car) => (
                    <CarCard key={car.id} car={car} view={view} />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg text-center shadow-md">
                  <h3 className="text-xl font-semibold mb-2">No cars found</h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find any cars matching your selected filters. Please try adjusting your search criteria.
                  </p>
                  <Button onClick={() => setFilters({})}>Clear All Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cars;
