package com.bvrith.dto;

public class CreateBookingRequest {

	 private String email;
	    private Long carId;
	    private String startDate;
	    private String endDate;

	    // Getters and setters
	    public String getEmail() {
	        return email;
	    }
	    public void setEmail(String email) {
	        this.email = email;
	    }

	    public Long getCarId() {
	        return carId;
	    }
	    public void setCarId(Long carId) {
	        this.carId = carId;
	    }

	    public String getStartDate() {
	        return startDate;
	    }
	    public void setStartDate(String startDate) {
	        this.startDate = startDate;
	    }

	    public String getEndDate() {
	        return endDate;
	    }
	    public void setEndDate(String endDate) {
	        this.endDate = endDate;
	    }
	    
	    
}
