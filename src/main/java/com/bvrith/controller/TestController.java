package com.bvrith.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bvrith.service.EmailService;

@RestController
public class TestController {
	 @Autowired
	    private EmailService emailService;

	    @GetMapping("/test-email")
	    public String testEmail() {
	        emailService.sendHtmlEmail("john.doe@example.com", "Test Email", "This is a test message from your car rental system.");
	        return "Email sent!";
	    }
}
//'1', 'john.doe@email.com', 'John Doe', 'pass123'
