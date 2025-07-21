// ✅ User related types — aligns with your backend User model
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'admin'; // Matches your backend enum/string
}

// ✅ Auth state shape
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// ✅ Car model — aligns with Car.java entity
export interface Car {
  id: number;
  brand: string;
  model: string;
  brandModel: string;             // e.g., "Toyota Fortuner"
  carType: CarType;               // Enum, e.g., "SUV"
  fuelType: FuelType;             // Enum, e.g., "PETROL"
  pricePerDay: number;
  available: boolean;
  features: string;               // Comma-separated string
  location?: string;              // Optional
  imageUrl?: string;              // Optional
}

// ✅ Enum-like types — must match your backend enums
export type CarType = 'SUV' | 'Sedan' | 'Hatchback' | 'Convertible' | 'Sports' | 'Luxury';
export type FuelType = 'PETROL' | 'DIESEL' | 'ELECTRIC' | 'HYBRID';

// ✅ Car filtering — aligns with CarFilterRequest DTO
export interface CarFilters {
  carType?: string;
  fuelType?: string;
  minPrice?: number;
  maxPrice?: number;
}

export type BookingStatus = 'PENDING_PAYMENT' | 'PAID' | 'CANCELLED';


export interface Booking {
  id: number;
  startDate: string;
  endDate: string;
  totalFare: number;
  bookingStatus: BookingStatus;
  paymentStatus: string;
  createdAt: string;
  userId: number;
  car: {
    year: number;
    brand: string;
    model: string;
    pricePerDay: number;
  };
}


// ✅ Create booking request (for POST /bookings)
export interface CreateBookingRequest {
  email: string;
  carId: number;
  startDate: string; // format: YYYY-MM-DD
  endDate: string;   // format: YYYY-MM-DD
}

// ✅ Review related types (future feature)
export interface Review {
  id: string;
  userId: string;
  carId: string;
  rating: number;                 // 1–5
  comment: string;
  date: string;
  userName: string;
}
