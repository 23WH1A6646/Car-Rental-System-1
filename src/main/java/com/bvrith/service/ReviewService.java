package com.bvrith.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bvrith.model.Review;
import com.bvrith.repository.ReviewRepository;

@Service
public class ReviewService {
	@Autowired
    private ReviewRepository reviewRepository;

    // Add new review
    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    // Get reviews for a specific car
    public List<Review> getReviewsForCar(Long carId) {
        return reviewRepository.findByCarId(carId);
    }
    
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }
}
