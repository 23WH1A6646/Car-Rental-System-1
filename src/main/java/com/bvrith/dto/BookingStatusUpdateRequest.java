package com.bvrith.dto;

import com.bvrith.model.Booking.BookingStatus;

public class BookingStatusUpdateRequest {
		
	private BookingStatus status;

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }
}
