package com.bvrith.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bvrith.dto.PaymentRequest;
import com.bvrith.model.Payment;
import com.bvrith.service.PaymentService;


@RestController
@RequestMapping("/api/payments")  // ✅ Needed for /api/payments/create
@CrossOrigin(origins = "http://localhost:8081") // ✅ Optional: allow frontend access
public class PaymentController {

	@Autowired
    private PaymentService paymentService;

    // ✅ Authenticated user creates payment for their own booking
    @PostMapping("/create")
    public ResponseEntity<Payment> createPayment(@RequestBody PaymentRequest request) {
        Payment payment = paymentService.createPayment(request);
        return ResponseEntity.ok(payment);
    }

    // ✅ Authenticated user views their own payments
    @GetMapping("/user/{email}")
    public ResponseEntity<List<Payment>> getPaymentsByUserEmail(@PathVariable String email) {
        List<Payment> payments = paymentService.getPaymentsByUserEmail(email);
        return ResponseEntity.ok(payments);
    }

    // ✅ Admin fetches payment by ID and user's email
    @GetMapping("/{id}/user/{email}")
    public ResponseEntity<Payment> getPaymentByIdAndUserEmail(
            @PathVariable Long id,
            @PathVariable String email) {
        Payment payment = paymentService.getPaymentByIdAndUserEmail(id, email);
        return ResponseEntity.ok(payment);
    }

    // ✅ Admin fetches all payments of a booking
    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<List<Payment>> getPaymentsByBookingId(@PathVariable Long bookingId) {
        List<Payment> payments = paymentService.getPaymentsByBookingId(bookingId);
        return ResponseEntity.ok(payments);
    }
}
