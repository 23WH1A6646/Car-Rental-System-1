package com.bvrith.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bvrith.dto.FareRequest;
import com.bvrith.dto.FareResponse;
import com.bvrith.model.Car;
import com.bvrith.repository.CarRepository;
import com.bvrith.service.FareEstimatorService;

@RestController
@RequestMapping("/api/fare")
@CrossOrigin(origins = "http://localhost:8081")
public class FareController {
	 @Autowired
	    private CarRepository carRepository;

	    @Autowired
	    private FareEstimatorService fareEstimatorService;

	    /**
	     * Estimates the rental fare for a given car.
	     *
	     * @apiNote Expects a JSON request body with the following fields:
	     * <ul>
	     *   <li><b>carId</b> (Long) - ID of the car</li>
	     *   <li><b>startDate</b> (String, format: yyyy-MM-dd) - Rental start date</li>
	     *   <li><b>endDate</b> (String, format: yyyy-MM-dd) - Rental end date</li>
	     *   <li><b>totalKmDriven</b> (Double) - Total kilometers driven by the user</li>
	     *   <li><b>lateHours</b> (int) - Number of hours the car was returned late</li>
	     * </ul>
	     *
	     * @param request JSON body mapped to {@link FareRequest}
	     * @return JSON response with detailed fare breakdown in {@link FareResponse}
	     */
	    @PostMapping("/estimate")
	    public ResponseEntity<FareResponse> estimateFare(@RequestBody FareRequest request) {
	        if (request.getCarId() == null) {
	            return ResponseEntity.badRequest().build();
	        }

	        Optional<Car> carOpt = carRepository.findById(request.getCarId());
	        if (carOpt.isEmpty()) {
	            return ResponseEntity.notFound().build();
	        }

	        Car car = carOpt.get();

	        FareResponse fareResponse = fareEstimatorService.calculateFare(
	            car.getPricePerDay(),
	            request.getStartDate(),
	            request.getEndDate(),
	            request.getTotalKmDriven(),
	            request.getLateHours()
	        );

	        return ResponseEntity.ok(fareResponse);
	    }
}
