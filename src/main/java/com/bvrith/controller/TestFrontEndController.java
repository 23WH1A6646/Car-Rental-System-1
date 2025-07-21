package com.bvrith.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestFrontEndController {
	@GetMapping("/test")
    public String testEndpoint() {
        return "CORS working!";
    }
}
