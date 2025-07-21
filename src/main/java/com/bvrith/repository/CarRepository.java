package com.bvrith.repository;

import java.util.List;

//import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bvrith.model.Car;
import com.bvrith.model.FuelType;

public interface CarRepository extends JpaRepository<Car, Long> {

	// Find all cars that are available or unavailable
    List<Car> findByAvailable(boolean available);

    // Optional: Find by brand
    List<Car> findByBrand(String brand);

    // Optional: Find cars cheaper than or equal to a given price
    List<Car> findByPricePerDayLessThanEqual(double pricePerDay);

    // Optional: Find by brand and availability
    List<Car> findByBrandAndAvailable(String brand, boolean available);
    
    // Filter by both carType and fuelType
    List<Car> findByCarTypeAndFuelType(String carType, FuelType fuelType);

    // Optional: Filter only by carType
    List<Car> findByCarType(String carType);

    // Optional: Filter only by fuelType
    List<Car> findByFuelType(FuelType fuelType);
    
   

    
}
