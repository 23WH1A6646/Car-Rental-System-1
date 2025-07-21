import { Car, Booking, User, CarType, FuelType, TransmissionType, BookingStatus, PaymentStatus } from '../types';

// Mock users
export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    role: 'user',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '098-765-4321',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    role: 'admin',
  },
];

// Mock cars
export const cars: Car[] = [
  {
    id: '1',
    make: 'Maruti',
    model: 'Swift VXi',
    year: 2023,
    type: 'Hatchback',
    fuelType: 'Petrol',
    transmission: 'Manual',
    seatingCapacity: 5,
    pricePerDay: 1200,
    availability: true,
    images: [
      'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti-Suzuki/Swift/10406/1697698080380/front-left-side-47.jpg',
      'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti-Suzuki/Swift/10406/1697698080380/rear-left-view-121.jpg'
    ],
    features: ['AC', 'Manual', 'Petrol'],
    location: 'Mumbai',
    rating: 4.6,
    reviewCount: 12,
  },
  {
    id: '2',
    make: 'Toyota',
    model: 'Innova Crysta',
    year: 2023,
    type: 'MPV',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    seatingCapacity: 7,
    pricePerDay: 2800,
    availability: true,
    images: [
      'https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Innova-Crysta/10901/1697698080380/front-left-side-47.jpg',
      'https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Innova-Crysta/10901/1697698080380/rear-left-view-121.jpg'
    ],
    features: ['AC', 'Automatic', 'Diesel'],
    location: 'Delhi',
    rating: 4.8,
    reviewCount: 20,
  },
  {
    id: '3',
    make: 'Hyundai',
    model: 'Creta SX',
    year: 2023,
    type: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Manual',
    seatingCapacity: 5,
    pricePerDay: 2400,
    availability: false,
    images: [
      'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Creta/7695/1703137674442/front-left-side-47.jpg',
      'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Creta/7695/1703137674442/rear-left-view-121.jpg'
    ],
    features: ['Sunroof', 'AC', 'Petrol'],
    location: 'Bangalore',
    rating: 4.7,
    reviewCount: 18,
  },
  {
    id: '4',
    make: 'Honda',
    model: 'City ZX',
    year: 2023,
    type: 'Sedan',
    fuelType: 'Petrol',
    transmission: 'Manual',
    seatingCapacity: 5,
    pricePerDay: 2200,
    availability: true,
    images: [
      'https://stimg.cardekho.com/images/carexteriorimages/630x420/Honda/City/9710/1677914238296/front-left-side-47.jpg',
      'https://stimg.cardekho.com/images/carexteriorimages/630x420/Honda/City/9710/1677914238296/rear-left-view-121.jpg'
    ],
    features: ['AC', 'Cruise Control', 'Petrol'],
    location: 'Chennai',
    rating: 4.7,
    reviewCount: 15,
  },
  {
    id: '5',
    make: 'Toyota',
    model: 'Fortuner GR',
    year: 2023,
    type: 'SUV',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    seatingCapacity: 7,
    pricePerDay: 3500,
    availability: false,
    images: [
      'https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Fortuner/10903/1690544151440/front-left-side-47.jpg',
      'https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Fortuner/10903/1690544151440/rear-left-view-121.jpg'
    ],
    features: ['4x4', 'Sunroof', 'Diesel'],
    location: 'Hyderabad',
    rating: 4.9,
    reviewCount: 22,
  },
];

// Mock bookings
export const bookings: Booking[] = [
  {
    id: '1',
    userId: '1',
    carId: '1',
    startDate: '2023-10-15',
    endDate: '2023-10-20',
    totalAmount: 375,
    status: 'completed',
    createdAt: '2023-10-01T10:30:00Z',
    paymentStatus: 'completed',
  },
  {
    id: '2',
    userId: '1',
    carId: '4',
    startDate: '2023-11-10',
    endDate: '2023-11-15',
    totalAmount: 600,
    status: 'confirmed',
    createdAt: '2023-10-20T14:45:00Z',
    paymentStatus: 'completed',
  },
  {
    id: '3',
    userId: '1',
    carId: '6',
    startDate: '2023-12-05',
    endDate: '2023-12-10',
    totalAmount: 1000,
    status: 'pending',
    createdAt: '2023-11-15T09:15:00Z',
    paymentStatus: 'pending',
  },
];

// Available filter options for cars
export const filterOptions = {
  carTypes: ['SUV', 'Sedan', 'Hatchback', 'Convertible', 'Sports', 'Luxury'] as CarType[],
  fuelTypes: ['Petrol', 'Diesel', 'Electric', 'Hybrid'] as FuelType[],
  transmissionTypes: ['Automatic', 'Manual'] as TransmissionType[],
  locations: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad'],
  priceRanges: {
    min: 1000,
    max: 2500,
    step: 100
  }
};

// Helper to get car details by ID
export const getCarById = (id: string): Car | undefined => {
  return cars.find(car => car.id === id);
};

// Helper to get user bookings
export const getUserBookings = (userId: string): Booking[] => {
  return bookings
    .filter(booking => booking.userId === userId)
    .map(booking => ({
      ...booking,
      car: getCarById(booking.carId)
    }));
};

// Helper to get filtered cars
export const getFilteredCars = (filters: any): Car[] => {
  return cars.filter(car => {
    let match = true;
    
    if (filters.type && filters.type.length > 0) {
      match = match && filters.type.includes(car.type);
    }
    
    if (filters.fuelType && filters.fuelType.length > 0) {
      match = match && filters.fuelType.includes(car.fuelType);
    }
    
    if (filters.transmission && filters.transmission.length > 0) {
      match = match && filters.transmission.includes(car.transmission);
    }
    
    if (filters.minPrice) {
      match = match && car.pricePerDay >= filters.minPrice;
    }
    
    if (filters.maxPrice) {
      match = match && car.pricePerDay <= filters.maxPrice;
    }
    
    if (filters.location) {
      match = match && car.location === filters.location;
    }
    
    if (filters.seatingCapacity) {
      match = match && car.seatingCapacity >= filters.seatingCapacity;
    }
    
    return match;
  });
};
