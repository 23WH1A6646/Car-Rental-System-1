package com.bvrith.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bvrith.model.Review;
import com.bvrith.service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
	 @Autowired
	    private ReviewService reviewService;

	    // Add a review
	    @PostMapping("/add")
	    public Review addReview(@RequestBody Review review) {
	        return reviewService.addReview(review);
	    }

	    // Get all reviews for a specific car
	    @GetMapping("/car/{carId}")
	    public List<Review> getReviewsForCar(@PathVariable Long carId) {
	        return reviewService.getReviewsForCar(carId);
	    }
	    
	    @GetMapping("/all")
	    public List<Review> getAllReviews() {
	        return reviewService.getAllReviews();
	    }
}
