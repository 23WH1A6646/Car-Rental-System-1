package com.bvrith.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bvrith.dto.CreateBookingRequest;
import com.bvrith.model.Booking;
import com.bvrith.model.Booking.BookingStatus;
import com.bvrith.model.Car;
import com.bvrith.model.User;
import com.bvrith.repository.BookingRepository;
import com.bvrith.repository.CarRepository;
import com.bvrith.repository.UserRepository;

@Service
public class BookingService {

	@Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    public Booking createBooking(CreateBookingRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + request.getEmail()));

        Car car = carRepository.findById(request.getCarId())
                .orElseThrow(() -> new RuntimeException("Car not found with ID: " + request.getCarId()));

        LocalDate startLocal = LocalDate.parse(request.getStartDate());
        LocalDate endLocal = LocalDate.parse(request.getEndDate());

        if (startLocal == null || endLocal == null) {
            throw new RuntimeException("Booking dates cannot be null.");
        }

        if (endLocal.isBefore(startLocal)) {
            throw new RuntimeException("Return date must be after pickup date.");
        }

        if (startLocal.isBefore(LocalDate.now())) {
            throw new RuntimeException("Pickup date cannot be in the past.");
        }

        long days = ChronoUnit.DAYS.between(startLocal, endLocal);
        if (days == 0) {
            days = 1; // Same-day booking
        }

        Booking booking = new Booking();
        booking.setCar(car);
        booking.setUser(user);
        booking.setStartDate(startLocal);
        booking.setEndDate(endLocal);
        booking.setBookingStatus(Booking.BookingStatus.PENDING_PAYMENT);
        booking.setTotalFare(car.getPricePerDay() * days);

        Booking savedBooking = bookingRepository.save(booking);
        emailService.sendBookingStatusEmail(savedBooking);
        return savedBooking;
    }
    // Get all bookings for a specific user
    public List<Booking> getBookingsByUserEmail(String email) {
        return bookingRepository.findByUser_Email(email);
    }

    // Cancel a booking (only if it belongs to the user)
    public boolean cancelBooking(Long bookingId, String email) {
        Booking booking = bookingRepository.findByIdAndUser_Email(bookingId, email);
        if (booking == null) {
            throw new RuntimeException("Booking not found or unauthorized.");
        }
        booking.setBookingStatus(Booking.BookingStatus.CANCELLED);
        bookingRepository.save(booking);
        return true;
    }

    // Get a specific booking (only if it belongs to the user)
    public Booking getBookingById(Long id, String email) {
        Booking booking = bookingRepository.findByIdAndUser_Email(id, email);
        if (booking == null) {
            throw new RuntimeException("Booking not found or unauthorized.");
        }
        return booking;
    }

    // Get all bookings (for admin management)
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking updateStatus(Long id, String status) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found with id " + id));
        booking.setBookingStatus(BookingStatus.valueOf(status.toUpperCase()));
        
        Booking updated = bookingRepository.save(booking);
        emailService.sendBookingStatusEmail(updated); // ✅ Optional but good

        return updated;
    }


    // Delete a booking (admin use)
    public void deleteBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    // Get booking by ID (admin use)
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + id));
    }
}
