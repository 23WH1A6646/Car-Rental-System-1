package com.bvrith.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bvrith.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // Fetch all payments for a specific user by their email
    List<Payment> findByBooking_User_Email(String email);

    // Find a payment by its ID and the associated user's email to ensure access control
    Payment findByIdAndBooking_User_Email(Long id, String email);

    // Fetch payments by booking ID
    List<Payment> findByBooking_Id(Long bookingId);
}
