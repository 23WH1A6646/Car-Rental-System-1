import { Link } from 'react-router-dom';
import { Car } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Fuel, CircleDot } from 'lucide-react';

interface CarCardProps {
  car: Car;
  view: 'grid' | 'list';
}

const CarCard = ({ car, view }: CarCardProps) => {
  const isListView = view === 'list';

  return (
    <Link to={`/cars/${car.id}`} className="block no-underline">
      <Card
        className={`hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden ${
          isListView ? 'flex flex-col md:flex-row-reverse items-stretch h-full' : ''
        }`}
      >
        {/* Car Image (on right for list view) */}
        {car.imageUrl && (
          <img
            src={car.imageUrl}
            alt={`${car.brand} ${car.model}`}
            className={`${
              isListView
                ? 'md:w-1/2 h-64 object-cover rounded-r-md'
                : 'w-full h-48 object-cover'
            }`}
            loading="lazy"
          />
        )}

        {/* Car Details (on left for list view) */}
        <CardContent
          className={`p-4 flex flex-col justify-between ${
            isListView ? 'md:w-1/2' : ''
          }`}
        >
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg text-rental-blue">
                {car.brand} {car.model}
              </h3>
              <Badge variant={car.available ? 'default' : 'destructive'}>
                {car.available ? 'Available' : 'Unavailable'}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="bg-gray-100">{car.carType}</Badge>
              <Badge variant="outline" className="bg-gray-100">{car.fuelType}</Badge>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Fuel className="h-4 w-4 mr-2" />
                <span>{car.fuelType}</span>
              </div>
              <div className="text-sm">{car.location}</div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
            <div>
              <span className="font-semibold text-lg text-rental-blue">₹{car.pricePerDay}</span>
              <span className="text-gray-600 text-sm"> / day</span>
            </div>
            <span className="inline-flex items-center font-medium text-rental-teal">
              View Details
              <CircleDot className="ml-1 h-4 w-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CarCard;
