package com.bvrith.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bvrith.dto.CarFilterRequest;
import com.bvrith.model.Car;
import com.bvrith.service.CarService;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "http://localhost:8081")
public class CarController {

	@Autowired
    private CarService carService;
	
	 // 🔐 Hardcoded admin credentials
    private final String ADMIN_EMAIL = "admin@gmail.com";
    private final String ADMIN_PASSWORD = "123";

    private boolean isAdmin(String email, String password) {
        return ADMIN_EMAIL.equals(email) && ADMIN_PASSWORD.equals(password);
    }

    // ✅ View all cars (both available and unavailable)
    @GetMapping("/all")
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }

    // ✅ View only available cars
    @GetMapping("/available")
    public List<Car> getAvailableCars() {
        return carService.getAvailableCars();
    }

    // ✅ View only unavailable cars
    @GetMapping("/unavailable")
    public List<Car> getUnavailableCars() {
        return carService.getUnavailableCars();
    }

    // ✅ View a single car by ID (for car detail page)
    @GetMapping("/{id}")
    public Car getCarById(@PathVariable Long id) {
        return carService.getCarById(id);
    }
    
    @PostMapping("/filter")
    public List<Car> filterCars(@RequestBody CarFilterRequest filter) {
        return carService.filterCars(
            filter.getCarType(),
            filter.getFuelType(),
            filter.getMinPrice(),
            filter.getMaxPrice()
        );
    }
    
 // 🔐 ✅ Add a new car (admin only)
    @PostMapping("/admin/add")
    public ResponseEntity<String> addCar(@RequestBody Car car,
                                         @RequestHeader("adminEmail") String email,
                                         @RequestHeader("adminPassword") String password) {
        if (!isAdmin(email, password)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Denied: Not an admin");
        }

        carService.saveCar(car);
        return ResponseEntity.ok("Car added successfully");
    }

    // 🔐 ✅ Update a car (admin only)
    @PostMapping("/admin/update/{id}")
    public ResponseEntity<String> updateCar(@PathVariable Long id,
                                            @RequestBody Car updatedCar,
                                            @RequestHeader("adminEmail") String email,
                                            @RequestHeader("adminPassword") String password) {
        if (!isAdmin(email, password)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Denied: Not an admin");
        }

        String result = carService.updateCar(id, updatedCar);
        return ResponseEntity.ok(result);
    }

    // 🔐 ✅ Change availability (admin only)
    @PostMapping("/admin/availability/{id}/{status}")
    public ResponseEntity<String> changeAvailability(@PathVariable Long id,
                                                     @PathVariable boolean status,
                                                     @RequestHeader("adminEmail") String email,
                                                     @RequestHeader("adminPassword") String password) {
        if (!isAdmin(email, password)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Denied: Not an admin");
        }

        String result = carService.changeAvailability(id, status);
        return ResponseEntity.ok(result);
    }

    // 🔐 ✅ Delete car (admin only)
    @PostMapping("/admin/delete/{id}")
    public ResponseEntity<String> deleteCar(@PathVariable Long id,
                                            @RequestHeader("adminEmail") String email,
                                            @RequestHeader("adminPassword") String password) {
        if (!isAdmin(email, password)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Denied: Not an admin");
        }

        String result = carService.deleteCar(id);
        return ResponseEntity.ok(result);
    }
    
    // ✅ 📌 NEW: Provide filter metadata to frontend
    @GetMapping("/filters/meta")
    public Map<String, Object> getFilterMeta() {
        List<Car> allCars = carService.getAllCars();

        Set<String> carTypes = allCars.stream()
                .map(Car::getCarType)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        Set<String> fuelTypes = allCars.stream()
                .map(car -> car.getFuelType().toString())
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        double minPrice = allCars.stream()
                .mapToDouble(Car::getPricePerDay)
                .min()
                .orElse(1000);

        double maxPrice = allCars.stream()
                .mapToDouble(Car::getPricePerDay)
                .max()
                .orElse(10000);

        Map<String, Object> response = new HashMap<>();
        response.put("carTypes", carTypes);
        response.put("fuelTypes", fuelTypes);
        response.put("priceRange", Map.of(
                "min", minPrice,
                "max", maxPrice,
                "step", 100
        ));

        return response;
    }

    
}
