package com.bvrith.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name ="payment")
public class Payment {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @ManyToOne
	    @JoinColumn(name = "booking_id", nullable = false)
	    @JsonBackReference
	    private Booking booking;

	    private Double amount;

	    @Enumerated(EnumType.STRING)
	    private PaymentMethod paymentMethod;

	    @Enumerated(EnumType.STRING)
	    private PaymentStatus paymentStatus;

	    @Column(updatable = false)
	    private LocalDateTime createdAt;

	    private LocalDateTime updatedAt;

	    @PrePersist
	    protected void onCreate() {
	        createdAt = LocalDateTime.now();
	    }

	    @PreUpdate
	    protected void onUpdate() {
	        updatedAt = LocalDateTime.now();
	    }

	    // ✅ Getters & Setters here (same as your version)
	    public Long getId() {
	        return id;
	    }

	    public void setId(Long id) {
	        this.id = id;
	    }

	    public Booking getBooking() {
	        return booking;
	    }

	    public void setBooking(Booking booking) {
	        this.booking = booking;
	    }

	    public Double getAmount() {
	        return amount;
	    }

	    public void setAmount(Double amount) {
	        this.amount = amount;
	    }

	    public PaymentMethod getPaymentMethod() {
	        return paymentMethod;
	    }

	    public void setPaymentMethod(PaymentMethod paymentMethod) {
	        this.paymentMethod = paymentMethod;
	    }

	    public PaymentStatus getPaymentStatus() {
	        return paymentStatus;
	    }

	    public void setPaymentStatus(PaymentStatus paymentStatus) {
	        this.paymentStatus = paymentStatus;
	    }

	    public LocalDateTime getCreatedAt() {
	        return createdAt;
	    }

	    public void setCreatedAt(LocalDateTime createdAt) {
	        this.createdAt = createdAt;
	    }

	    public LocalDateTime getUpdatedAt() {
	        return updatedAt;
	    }

	    public void setUpdatedAt(LocalDateTime updatedAt) {
	        this.updatedAt = updatedAt;
	    }
}

