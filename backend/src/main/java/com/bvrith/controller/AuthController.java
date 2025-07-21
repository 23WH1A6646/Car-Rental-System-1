package com.bvrith.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bvrith.model.User;
import com.bvrith.service.EmailService;
import com.bvrith.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:8081") // ✅ fixed malformed quote																																																																																																																																																																																																															1111111")
public class AuthController {

	

	@Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
        User newUser = userService.registerUser(user);
        if (newUser == null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "User already exists"));
        }
        
     // ✅ Send registration email
        String subject = "Welcome to Car Rental Platform!";
        String body = "<html><body style='font-family: Arial, sans-serif;'>" +
                "<h2 style='color:#4169E1;'>Welcome to Car Rental Platform!</h2>" +
                "<p>Hi <strong>" + newUser.getFullName() + "</strong>,</p>" +
                "<p>Thank you for registering with us. We're excited to have you on board.</p>" +
                "<a href='http://localhost:8081/cars' " +
                "style='display:inline-block;margin-top:15px;padding:10px 20px;background:#4169E1;color:white;text-decoration:none;border-radius:5px;'>Start Booking Now</a>" +
                "<p style='margin-top:30px;'>Regards,<br/>Car Rental Team</p>" +
                "</body></html>";

        emailService.sendHtmlEmail(newUser.getEmail(), subject, body);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Registration successful");
        response.put("name", newUser.getFullName());
        response.put("email", newUser.getEmail());
        response.put("role", "user");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        if (email.equals("admin@gmail.com") && password.equals("123")) {
            return ResponseEntity.ok(Map.of(
                    "message", "Admin login successful",
                    "name", "Admin",
                    "email", email,
                    "role", "admin"
            ));
        }

        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "User not found. Please register."));
        }

        if (!user.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid credentials"));
        }

        return ResponseEntity.ok(Map.of(
                "message", "User login successful",
                "name", user.getFullName(),
                "email", user.getEmail(),
                "role", "user"
        ));
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout() {
        return new ResponseEntity<>("Logout successful", HttpStatus.OK);
    }

    @PostMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> payload) {
        String currentEmail = payload.get("currentEmail");
        String newName = payload.get("newName");
        String newEmail = payload.get("newEmail");

        User updatedUser = userService.updateProfile(currentEmail, newName, newEmail);
        if (updatedUser == null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Email already taken or user not found"));
        }

        return ResponseEntity.ok(Map.of(
                "message", "Profile updated successfully",
                "name", updatedUser.getFullName(),
                "email", updatedUser.getEmail()
        ));
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String currentPassword = payload.get("currentPassword");
        String newPassword = payload.get("newPassword");

        boolean success = userService.changePassword(email, currentPassword, newPassword);
        if (!success) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Incorrect current password"));
        }

        return ResponseEntity.ok(Map.of("message", "Password changed successfully"));
    }

    @PostMapping("/request-otp")
    public ResponseEntity<Map<String, String>> requestOtp(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is required"));
        }

        User user = userService.generateOtp(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found"));
        }

        String message = "Your OTP for password reset is: " + user.getOtpCode() + ". It expires in 5 minutes.";
        emailService.sendHtmlEmail(email, "OTP for Password Reset", message);

        return ResponseEntity.ok(Map.of("message", "OTP sent to your email"));
    }

    @PostMapping("/reset-password-otp")
    public ResponseEntity<Map<String, String>> resetPasswordWithOtp(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String otp = payload.get("otp");
        String newPassword = payload.get("newPassword");

        boolean success = userService.resetPasswordWithOtp(email, otp, newPassword);
        if (!success) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Invalid or expired OTP"));
        }

        return ResponseEntity.ok(Map.of("message", "Password has been reset successfully"));
    }
}
