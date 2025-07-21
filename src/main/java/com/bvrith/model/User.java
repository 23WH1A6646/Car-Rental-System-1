package com.bvrith.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")

public class User {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(name = "full_name", nullable = false)
	    private String fullName;

	    @Column(unique = true, nullable = false)
	    private String email;

	    @Column(nullable = false)
	    private String password;

	    @Column(name = "otp_code")
	    private String otpCode;

	    @Column(name = "otp_expiry")
	    private LocalDateTime otpExpiry;

	    public Long getId() { return id; }
	    public void setId(Long id) { this.id = id; }

	    public String getFullName() { return fullName; }
	    public void setFullName(String fullName) { this.fullName = fullName; }

	    public String getEmail() { return email; }
	    public void setEmail(String email) { this.email = email; }

	    public String getPassword() { return password; }
	    public void setPassword(String password) { this.password = password; }

	    public String getOtpCode() { return otpCode; }
	    public void setOtpCode(String otpCode) { this.otpCode = otpCode; }

	    public LocalDateTime getOtpExpiry() { return otpExpiry; }
	    public void setOtpExpiry(LocalDateTime otpExpiry) { this.otpExpiry = otpExpiry; }
	}

	
