package com.bvrith.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bvrith.model.Car;
import com.bvrith.model.FuelType;
import com.bvrith.repository.BookingRepository;
import com.bvrith.repository.CarRepository;

@Service
public class CarService {

	private final CarRepository carRepository;

	@Autowired
	private BookingRepository bookingRepository;
	
    @Autowired
    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    // Get all cars, both available and unavailable
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    

    
    // Get only available cars
    public List<Car> getAvailableCars() {
        return carRepository.findByAvailable(true);
    }

    // Get only unavailable cars
    public List<Car> getUnavailableCars() {
        return carRepository.findByAvailable(false);
    }

    // Find a car by its ID
    public Car getCarById(Long id) {
        return carRepository.findById(id).orElse(null);  // Return null if car not found
    }
    
 // ✅ Save new car (admin only)
    public void saveCar(Car car) {
        carRepository.save(car);
    }

    // ✅ Update existing car (admin only)
    public String updateCar(Long id, Car updatedCar) {
        Car existingCar = carRepository.findById(id).orElse(null);
        if (existingCar == null) {
            return "Car not found";
        }

        existingCar.setBrandModel(updatedCar.getBrandModel());
        existingCar.setCarType(updatedCar.getCarType());
        existingCar.setFuelType(updatedCar.getFuelType());
        existingCar.setPricePerDay(updatedCar.getPricePerDay());
        existingCar.setAvailable(updatedCar.isAvailable());
        existingCar.setFeatures(updatedCar.getFeatures());
        existingCar.setImageUrl(updatedCar.getImageUrl());
        
        
        carRepository.save(existingCar);
        return "Car updated successfully";
    }

    // ✅ Change availability (admin only)
    public String changeAvailability(Long id, boolean status) {
        Car car = carRepository.findById(id).orElse(null);
        if (car == null) {
            return "Car not found";
        }

        car.setAvailable(status);
        carRepository.save(car);
        return "Availability updated to " + status;
    }

    public String deleteCar(Long id) {
        Car car = carRepository.findById(id).orElse(null);
        if (car == null) {
            return "Car not found";
        }

        // Check if bookings exist
        if (!bookingRepository.findByCar(car).isEmpty()) {
            throw new RuntimeException("Cannot delete: Car has existing bookings");
        }

        carRepository.deleteById(id);
        return "Car deleted successfully";
    }

    
    
 // ✅ Filter without using streams
    public List<Car> filterCars(String carType, FuelType fuelType, Double minPrice, Double maxPrice) {

        // Case 1: All filters are null → return all
        if (carType == null && fuelType == null && minPrice == null && maxPrice == null) {
            return carRepository.findAll();
        }

        // Case 2: Use available JPA methods first
        if (carType != null && fuelType != null && minPrice == null && maxPrice == null) {
            return carRepository.findByCarTypeAndFuelType(carType, fuelType);
        }

        if (carType != null && fuelType == null && minPrice == null && maxPrice == null) {
            return carRepository.findByCarType(carType);
        }

        if (carType == null && fuelType != null && minPrice == null && maxPrice == null) {
            return carRepository.findByFuelType(fuelType);
        }

        // Other combinations - fallback to findAll and manually filter
        List<Car> allCars = carRepository.findAll();

        // Use manual filtering with loops
        List<Car> filteredCars = new java.util.ArrayList<>();

        for (Car car : allCars) {
            boolean matches = true;

            if (carType != null && !carType.equalsIgnoreCase(car.getCarType())) {
                matches = false;
            }

            if (fuelType != null && !fuelType.equals(car.getFuelType())) {
                matches = false;
            }

            if (minPrice != null && car.getPricePerDay() < minPrice) {
                matches = false;
            }

            if (maxPrice != null && car.getPricePerDay() > maxPrice) {
                matches = false;
            }

            if (matches) {
                filteredCars.add(car);
            }
        }

        return filteredCars;
    }    
}
