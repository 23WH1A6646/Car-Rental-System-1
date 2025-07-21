package com.bvrith.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bvrith.model.Booking;
import com.bvrith.model.Car;

public interface BookingRepository extends JpaRepository<Booking, Long> {

	// Fetch all bookings for a specific user by email
    List<Booking> findByUser_Email(String email);

    // Find a booking by booking ID and user email to ensure the user only accesses their own bookings
    Booking findByIdAndUser_Email(Long id, String email);
    
    List<Booking> findByCar(Car car);
    
}
