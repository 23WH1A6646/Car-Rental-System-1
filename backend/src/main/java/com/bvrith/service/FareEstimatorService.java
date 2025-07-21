package com.bvrith.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import org.springframework.stereotype.Service;

import com.bvrith.dto.FareResponse;

@Service
public class FareEstimatorService {
	private static final double DAILY_KM_LIMIT = 300.0;     // allowed km/day
    private static final double EXTRA_KM_RATE = 10.0;       // ₹ per extra km
    private static final double LATE_HOUR_RATE = 100.0;     // ₹ per hour
    private static final double LATE_DAY_MULTIPLIER = 1.5;  // 1.5x for each late day

    public FareResponse calculateFare(double pricePerDay, LocalDate startDate, LocalDate endDate, Double totalKmDriven, int lateHours) {

        // 1. Rental Days Calculation
        long rentalDays = ChronoUnit.DAYS.between(startDate, endDate) + 1;
        if (rentalDays <= 0) rentalDays = 1;

        double baseFare = rentalDays * pricePerDay;

        // 2. Kilometers Driven
        double allowedKm = rentalDays * DAILY_KM_LIMIT;
        double totalKm = totalKmDriven != null ? totalKmDriven : 0.0;
        double extraKm = Math.max(0.0, totalKm - allowedKm);
        double extraKmCharge = extraKm * EXTRA_KM_RATE;

        // 3. Late Fee Calculation
        long extraLateDays = lateHours / 24;
        int remainingLateHours = lateHours % 24;

        double lateDayRate = pricePerDay * LATE_DAY_MULTIPLIER;
        double extraLateDayFare = extraLateDays * lateDayRate;
        double lateHourCharge = remainingLateHours * LATE_HOUR_RATE;

        // 4. Total Fare
        double totalFare = baseFare + extraKmCharge + extraLateDayFare + lateHourCharge;

        // 5. Build Response
        FareResponse response = new FareResponse();
        response.setBaseFare(baseFare);
        response.setAllowedKm(allowedKm);
        response.setTotalKmDriven(totalKm);
        response.setExtraKm(extraKm);
        response.setExtraKmCharge(extraKmCharge);
        response.setExtraKmRate(EXTRA_KM_RATE);

        response.setExtraLateDays(extraLateDays);
        response.setRemainingLateHours(remainingLateHours); // <== important for breakdown
        response.setLateHours(lateHours);
        response.setLateHourRate(LATE_HOUR_RATE);
        response.setLateHourCharge(lateHourCharge);
        response.setLateDayRate(lateDayRate);
        response.setExtraLateDayFare(extraLateDayFare);

        response.setPricePerDay(pricePerDay);
        response.setTotalFare(totalFare);

        return response;
    }
}
