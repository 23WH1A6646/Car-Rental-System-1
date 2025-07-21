package com.bvrith.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bvrith.dto.BookingStatusUpdateRequest;
import com.bvrith.dto.CreateBookingRequest;
//import com.bvrith.dto.EmailRequest;
import com.bvrith.model.Booking;
import com.bvrith.model.Car;
import com.bvrith.service.BookingService;
import com.bvrith.service.CarService;
 
@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:8081")
public class BookingController {

	@Autowired
    private BookingService bookingService;

    @Autowired
    private CarService carService;

    // ✅ Create new booking
    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody CreateBookingRequest request) {
        Booking booking = bookingService.createBooking(request);
        return ResponseEntity.ok(booking);
    }

    // ✅ Get all bookings (Admin use)
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();

        // ✅ Safely enrich car info to prevent 500 errors
        List<Booking> enrichedBookings = bookings.stream()
            .peek(booking -> {
                if (booking.getCar() != null) {
                    try {
                        Car car = carService.getCarById(booking.getCar().getId());
                        booking.setCar(car);
                    } catch (Exception e) {
                        System.err.println("Warning: Car enrichment failed for booking ID " + booking.getId());
                    }
                }
            })
            .collect(Collectors.toList());

        return ResponseEntity.ok(enrichedBookings);
    }

    // ✅ Update booking status (Admin use)
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateBookingStatus(
            @PathVariable Long id,
            @RequestBody BookingStatusUpdateRequest statusRequest) {
        try {
            Booking updated = bookingService.updateStatus(id, statusRequest.getStatus().name());
            return ResponseEntity.ok(updated); // ✅ Send full updated booking
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update status: " + e.getMessage());
        }
    }


    // ✅ Delete a booking (Admin use)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<Booking>> getBookingsByUser(@PathVariable String email) {
        List<Booking> bookings = bookingService.getBookingsByUserEmail(email);

        List<Booking> enrichedBookings = bookings.stream()
            .peek(booking -> {
                if (booking.getCar() != null) {
                    try {
                        Car car = carService.getCarById(booking.getCar().getId());
                        booking.setCar(car);
                    } catch (Exception e) {
                        System.err.println("Warning: Failed to fetch car for booking ID " + booking.getId());
                        booking.setCar(null); // Avoid 500 serialization error
                    }
                }
            })
            .collect(Collectors.toList());

        return ResponseEntity.ok(enrichedBookings);
    }


    // ✅ Get single booking by ID (Admin use)
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Booking booking = bookingService.getBookingById(id);
        return ResponseEntity.ok(booking);
    }
}
