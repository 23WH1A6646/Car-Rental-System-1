import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Badge } from '@/components/ui/badge';
import { Car as CarType } from '@/types';
import axios from 'axios';
import { ChevronRight, Calculator } from 'lucide-react';
import CarBookingForm from '@/components/cars/CarBookingForm';
import { useAuth } from '@/contexts/AuthContext';
import RentalCalculator from '@/components/cars/RentalCalculator';

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { authState } = useAuth();

  const [car, setCar] = useState<CarType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get<CarType>(`http://localhost:8080/api/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCar();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-20">Loading...</div>
      </MainLayout>
    );
  }

  if (!car) {
    return (
      <MainLayout>
        <div className="text-center py-20 text-red-500 font-semibold">Car Not Found</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-rental-background min-h-screen py-8">
        <div className="max-w-3xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm mb-6">
            <button onClick={() => navigate('/cars')} className="text-gray-500 hover:text-rental-blue">
              Cars
            </button>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-900 font-medium">
              {car.brand} {car.model}
            </span>
          </div>

          {/* Car Overview */}
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <h1 className="text-2xl font-bold text-rental-blue">
              {car.carType} - {car.brand} {car.model}
            </h1>

            {/* Image Section */}
            {car.imageUrl ? (
              <div className="my-4">
                <img
                  src={car.imageUrl}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full rounded-lg shadow-md object-cover h-64"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/640x360?text=Image+Unavailable';
                  }}
                />
              </div>
            ) : (
              <div className="my-4">
                <img
                  src="https://via.placeholder.com/640x360?text=No+Image"
                  alt="No Image"
                  className="w-full rounded-lg shadow-md object-cover h-64"
                />
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Badge variant="outline">{car.carType}</Badge>
              <Badge variant="outline">{car.fuelType}</Badge>
              <Badge variant={car.available ? 'default' : 'destructive'}>
                {car.available ? 'Available' : 'Unavailable'}
              </Badge>
            </div>

            <div>
              <h2 className="text-lg font-semibold mt-4 mb-2">Features</h2>
              {car.features ? (
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                  {car.features.split(',').map((feature, index) => (
                    <li key={index}>{feature.trim()}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No features listed.</p>
              )}
            </div>

            <div className="pt-4 border-t text-lg font-medium text-rental-teal">
              ₹{car.pricePerDay} / day
            </div>
          </div>

          {/* Fare Estimation Section */}
          <div className="mt-6 bg-white shadow-sm rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Calculator className="text-green-600 mr-2" />
              <h2 className="text-lg font-bold text-black">Estimate Your Fare</h2>
            </div>
            <RentalCalculator pricePerDay={car.pricePerDay} carId={car.id} />
          </div>

          {/* Booking Form Section */}
          <div className="mt-6 bg-white shadow-sm rounded-lg p-6">
            {authState.isAuthenticated ? (
              car.available ? (
                <CarBookingForm
                  carId={car.id}
                  pricePerDay={car.pricePerDay}
                  isAvailable={car.available}
                  isAuthenticated={authState.isAuthenticated}
                />
              ) : (
                <p className="text-red-600 font-medium">
                  This car is currently not available for booking.
                </p>
              )
            ) : (
              <p className="text-blue-600 font-medium">
                Please{' '}
                <span
                  onClick={() => navigate('/login')}
                  className="underline cursor-pointer text-blue-800 hover:text-blue-600"
                >
                  log in
                </span>{' '}
                to book this car.
              </p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CarDetail;
