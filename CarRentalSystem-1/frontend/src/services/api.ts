import axios from 'axios';
import { Car, Booking, User, CarFilters, CreateBookingRequest } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//
// ✅ Cars API
//
export const carAPI = {
  getAllCars: () => api.get<Car[]>('/cars'),
  getCarById: (id: string) => api.get<Car>(`/cars/${id}`),
  getFilteredCars: (filters: CarFilters) => api.post<Car[]>('/cars/filter', filters),
  createCar: (car: Omit<Car, 'id'>) => api.post<Car>('/cars', car),
  updateCar: (id: string, car: Partial<Car>) => api.put<Car>(`/cars/${id}`, car),
  deleteCar: (id: string) => api.delete(`/cars/${id}`),
};

//
// ✅ Bookings API
//
export const bookingAPI = {
  getAllBookings: () => api.get<Booking[]>('/bookings'),
  getBookingById: (id: string) => api.get<Booking>(`/bookings/${id}`),
  getUserBookingsByEmail: (email: string) => api.get<Booking[]>(`/bookings/user/${email}`),
  createBooking: (booking: CreateBookingRequest) => api.post<Booking>('/bookings', booking),
  updateBooking: (
    id: string,
    data: { status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' }
  ) => api.put(`/bookings/${id}/status`, data),
  
  // ✅ Add this method
  deleteBooking: (id: string) => api.delete(`/bookings/${id}`),
};

//
// ✅ Users API
//
export const userAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post<{ token: string; user: User }>('/auth/login', credentials),

  register: (userData: Omit<User, 'id'>) =>
    api.post<{ token: string; user: User }>('/auth/register', userData),

  getCurrentUser: () => api.get<User>('/users/me'),

  updateUser: (id: string, userData: Partial<User>) =>
    api.put<User>(`/users/${id}`, userData),
};

export default api;
