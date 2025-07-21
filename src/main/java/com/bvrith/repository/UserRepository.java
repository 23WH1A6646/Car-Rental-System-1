package com.bvrith.repository;

import java.util.Optional;

//import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bvrith.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	 // 🔐 Used during login: find user by email to match password
    Optional<User> findByEmail(String email);

    // 🧽 Used when you want to delete a user account by email
    void deleteByEmail(String email);

    // Optionally: check if email is already registered
    boolean existsByEmail(String email);
    
    //Optional<User> findByResetToken(String resetToken);

    
}
