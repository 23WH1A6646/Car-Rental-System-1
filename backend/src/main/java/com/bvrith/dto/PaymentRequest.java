package com.bvrith.dto;

import com.bvrith.model.PaymentMethod;

public class PaymentRequest {

	 private Long bookingId;
	    private double amount;
	    private PaymentMethod method;

	    // Getters & Setters
	    public Long getBookingId() {
	        return bookingId;
	    }

	    public void setBookingId(Long bookingId) {
	        this.bookingId = bookingId;
	    }

	    public double getAmount() {
	        return amount;
	    }

	    public void setAmount(double amount) {
	        this.amount = amount;
	    }

	    public PaymentMethod getMethod() {
	        return method;
	    }

	    public void setMethod(PaymentMethod method) {
	        this.method = method;
	    }
	
}
