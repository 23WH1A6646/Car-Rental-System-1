package com.bvrith.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bvrith.dto.PaymentRequest;
import com.bvrith.model.Booking;
import com.bvrith.model.Payment;
import com.bvrith.model.PaymentStatus;
import com.bvrith.repository.BookingRepository;
import com.bvrith.repository.PaymentRepository;

@Service
public class PaymentService {

	@Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    // ✅ Create payment with default status PENDING
    public Payment createPayment(PaymentRequest request) {
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + request.getBookingId()));

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(request.getAmount());
        payment.setPaymentMethod(request.getMethod());
        payment.setPaymentStatus(PaymentStatus.PENDING); // ✅ Default to PENDING

        return paymentRepository.save(payment);
    }

    // ✅ Get all payments by user email
    public List<Payment> getPaymentsByUserEmail(String email) {
        return paymentRepository.findByBooking_User_Email(email);
    }

    // ✅ Get specific payment by ID and user's email
    public Payment getPaymentByIdAndUserEmail(Long id, String email) {
        Payment payment = paymentRepository.findByIdAndBooking_User_Email(id, email);
        if (payment == null) {
            throw new RuntimeException("Payment not found or unauthorized access.");
        }
        return payment;
    }

    // ✅ Get all payments for a booking ID
    public List<Payment> getPaymentsByBookingId(Long bookingId) {
        return paymentRepository.findByBooking_Id(bookingId);
    }
}
