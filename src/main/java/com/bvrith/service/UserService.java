package com.bvrith.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bvrith.model.User;
import com.bvrith.repository.UserRepository;

@Service
public class UserService {

	@Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return null;
        }
        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public boolean validateCredentials(String email, String password) {
        User user = findByEmail(email);
        return user != null && user.getPassword().equals(password);
    }

    public User updateProfile(String currentEmail, String newName, String newEmail) {
        Optional<User> optionalUser = userRepository.findByEmail(currentEmail);
        if (optionalUser.isEmpty()) return null;

        User user = optionalUser.get();
        if (!user.getEmail().equals(newEmail) && userRepository.findByEmail(newEmail).isPresent()) {
            return null;
        }

        user.setFullName(newName);
        user.setEmail(newEmail);
        return userRepository.save(user);
    }

    public boolean changePassword(String email, String currentPassword, String newPassword) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) return false;

        User user = optionalUser.get();
        if (!user.getPassword().equals(currentPassword)) {
            return false;
        }

        user.setPassword(newPassword);
        userRepository.save(user);
        return true;
    }

    // ✅ Generate 6-digit OTP
    public User generateOtp(String email) {
        User user = findByEmail(email);
        if (user == null) return null;

        String otp = String.format("%06d", new Random().nextInt(999999));
        user.setOtpCode(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));
        return userRepository.save(user);
    }

    // ✅ Verify OTP
    public boolean verifyOtp(String email, String otp) {
        User user = findByEmail(email);
        if (user == null) return false;
        return otp.equals(user.getOtpCode()) && LocalDateTime.now().isBefore(user.getOtpExpiry());
    }

    // ✅ Reset password after OTP verification
    public boolean resetPasswordWithOtp(String email, String otp, String newPassword) {
        User user = findByEmail(email);
        if (user == null) return false;

        if (!otp.equals(user.getOtpCode()) || LocalDateTime.now().isAfter(user.getOtpExpiry())) {
            return false;
        }

        user.setPassword(newPassword);
        user.setOtpCode(null);
        user.setOtpExpiry(null);
        userRepository.save(user);
        return true;
    }
}
