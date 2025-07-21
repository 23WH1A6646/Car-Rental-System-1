package com.bvrith.dto;

public class FareResponse {

	private double pricePerDay;
    private double baseFare;
    private double allowedKm;
    private double totalKmDriven;
    private double extraKm;
    private double extraKmRate;
    private double extraKmCharge;

    // === Late Day Charges ===
    private long extraLateDays;
    private double lateDayRate;         // 1.5 * pricePerDay
    private double extraLateDayFare;

    // === Late Hour Charges ===
    private int lateHours;              // Total late hours
    private int remainingLateHours;     // Late hours % 24
    private double lateHourRate;
    private double lateHourCharge;

    // === Total Fare ===
    private double totalFare;

    // === Getters and Setters ===
    public double getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(double pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public double getBaseFare() {
        return baseFare;
    }

    public void setBaseFare(double baseFare) {
        this.baseFare = baseFare;
    }

    public double getAllowedKm() {
        return allowedKm;
    }

    public void setAllowedKm(double allowedKm) {
        this.allowedKm = allowedKm;
    }

    public double getTotalKmDriven() {
        return totalKmDriven;
    }

    public void setTotalKmDriven(double totalKmDriven) {
        this.totalKmDriven = totalKmDriven;
    }

    public double getExtraKm() {
        return extraKm;
    }

    public void setExtraKm(double extraKm) {
        this.extraKm = extraKm;
    }

    public double getExtraKmRate() {
        return extraKmRate;
    }

    public void setExtraKmRate(double extraKmRate) {
        this.extraKmRate = extraKmRate;
    }

    public double getExtraKmCharge() {
        return extraKmCharge;
    }

    public void setExtraKmCharge(double extraKmCharge) {
        this.extraKmCharge = extraKmCharge;
    }

    public long getExtraLateDays() {
        return extraLateDays;
    }

    public void setExtraLateDays(long extraLateDays) {
        this.extraLateDays = extraLateDays;
    }

    public double getLateDayRate() {
        return lateDayRate;
    }

    public void setLateDayRate(double lateDayRate) {
        this.lateDayRate = lateDayRate;
    }

    public double getExtraLateDayFare() {
        return extraLateDayFare;
    }

    public void setExtraLateDayFare(double extraLateDayFare) {
        this.extraLateDayFare = extraLateDayFare;
    }

    public int getLateHours() {
        return lateHours;
    }

    public void setLateHours(int lateHours) {
        this.lateHours = lateHours;
    }

    public int getRemainingLateHours() {
        return remainingLateHours;
    }

    public void setRemainingLateHours(int remainingLateHours) {
        this.remainingLateHours = remainingLateHours;
    }

    public double getLateHourRate() {
        return lateHourRate;
    }

    public void setLateHourRate(double lateHourRate) {
        this.lateHourRate = lateHourRate;
    }

    public double getLateHourCharge() {
        return lateHourCharge;
    }

    public void setLateHourCharge(double lateHourCharge) {
        this.lateHourCharge = lateHourCharge;
    }

    public double getTotalFare() {
        return totalFare;
    }

    public void setTotalFare(double totalFare) {
        this.totalFare = totalFare;
    }
}
