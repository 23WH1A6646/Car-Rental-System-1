package com.bvrith.dto;

import java.time.LocalDate;

public class FareRequest {
	 private Long carId;               // Used to fetch Car and get pricePerDay
	    private LocalDate startDate;     // Rental start date
	    private LocalDate endDate;       // Rental end date
	    private Double totalKmDriven;    // Total kilometers driven by user
	    private int lateHours;           // Number of late hours

	    // Constructors
	    public FareRequest() {}

	    public FareRequest(Long carId, LocalDate startDate, LocalDate endDate, Double totalKmDriven, int lateHours) {
	        this.carId = carId;
	        this.startDate = startDate;
	        this.endDate = endDate;
	        this.totalKmDriven = totalKmDriven;
	        this.lateHours = lateHours;
	    }

	    // Getters and Setters
	    public Long getCarId() {
	        return carId;
	    }

	    public void setCarId(Long carId) {
	        this.carId = carId;
	    }

	    public LocalDate getStartDate() {
	        return startDate;
	    }

	    public void setStartDate(LocalDate startDate) {
	        this.startDate = startDate;
	    }

	    public LocalDate getEndDate() {
	        return endDate;
	    }

	    public void setEndDate(LocalDate endDate) {
	        this.endDate = endDate;
	    }

	    public Double getTotalKmDriven() {
	        return totalKmDriven;
	    }

	    public void setTotalKmDriven(Double totalKmDriven) {
	        this.totalKmDriven = totalKmDriven;
	    }

	    public int getLateHours() {
	        return lateHours;
	    }

	    public void setLateHours(int lateHours) {
	        this.lateHours = lateHours;
	    }
}
