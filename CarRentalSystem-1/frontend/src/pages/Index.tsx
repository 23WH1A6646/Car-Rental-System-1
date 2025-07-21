import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import MainLayout from '@/components/layout/MainLayout';
import CarSearchBar from '@/components/cars/CarSearchBar';
import { Button } from '@/components/ui/button';
import { Car } from '@/types';
import { ChevronRight, Shield, Clock, Award } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const response = await axios.get<Car[]>('http://localhost:8080/api/cars/available');
        setFeaturedCars(response.data.slice(0, 4)); // Show only top 4
      } catch (error) {
        console.error('Error fetching featured cars:', error);
      }
    };

    fetchFeaturedCars();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-rental-blue to-blue-700 text-white">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-12 lg:mb-0 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Your Journey, Your Car Choice
              </h1>
              <p className="text-xl mb-8 text-blue-100 max-w-lg">
                Rent the perfect vehicle for any occasion. From economy cars to luxury SUVs, we have the right car for you.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <CarSearchBar />
              </div>
            </div>
            <div className="relative lg:block animate-slide-in">
              <img
                src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf"
                alt="Luxury car"
                className="rounded-lg shadow-2xl object-cover h-full max-h-[500px] w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[2px] pattern-dots pattern-blue-500 pattern-bg-transparent pattern-size-4 pattern-opacity-10"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-rental-blue">Why Choose CarCompass?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              We offer the best car rental experience with our premium fleet and exceptional service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="inline-flex items-center justify-center p-3 bg-rental-teal/20 rounded-full mb-4">
                <Shield className="h-8 w-8 text-rental-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-rental-blue">100% Secure Booking</h3>
              <p className="text-gray-600">
                Your payment and personal information are completely secure. We use the latest security measures.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="inline-flex items-center justify-center p-3 bg-rental-teal/20 rounded-full mb-4">
                <Clock className="h-8 w-8 text-rental-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-rental-blue">24/7 Customer Support</h3>
              <p className="text-gray-600">
                Our friendly team is always ready to help you with any questions or concerns.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="inline-flex items-center justify-center p-3 bg-rental-teal/20 rounded-full mb-4">
                <Award className="h-8 w-8 text-rental-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-rental-blue">Quality Guaranteed</h3>
              <p className="text-gray-600">
                All our vehicles undergo regular maintenance to ensure your safety and comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-rental-blue">Featured Cars</h2>
              <p className="mt-2 text-lg text-gray-600">Discover our top-rated vehicles</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/cars')}>
              View All <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                {car.imageUrl && (
                  <img
                    src={car.imageUrl}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    {car.carType} {car.brand} {car.model}
                  </h3>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <span className="font-bold text-lg">₹{car.pricePerDay}</span>
                      <span className="text-gray-500 text-sm"> /day</span>
                    </div>
                    <Button size="sm" onClick={() => navigate(`/cars/${car.id}`)}>
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
