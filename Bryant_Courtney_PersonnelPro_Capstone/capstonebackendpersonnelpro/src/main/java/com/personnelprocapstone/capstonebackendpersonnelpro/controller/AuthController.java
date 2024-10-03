package com.personnelprocapstone.capstonebackendpersonnelpro.controller;

import com.personnelprocapstone.capstonebackendpersonnelpro.Auth.AuthService;
import com.personnelprocapstone.capstonebackendpersonnelpro.dto.LoginRequest;
import com.personnelprocapstone.capstonebackendpersonnelpro.dto.LoginResponse;
import com.personnelprocapstone.capstonebackendpersonnelpro.dto.RegisterRequest;
import com.personnelprocapstone.capstonebackendpersonnelpro.entity.Employee;
import com.personnelprocapstone.capstonebackendpersonnelpro.service.EmployeeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;
    private final EmployeeService employeeService;

    @Autowired
    public AuthController(AuthService authService, EmployeeService employeeService) {
        this.authService = authService;
        this.employeeService = employeeService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        logger.info("Login attempt for email: {}", loginRequest.getEmail());
        try {
            String token = authService.login(loginRequest.getEmail(), loginRequest.getPassword());
            if (token != null) {
                logger.info("Login successful for email: {}", loginRequest.getEmail());
                return ResponseEntity.ok(new LoginResponse(token));
            } else {
                logger.warn("Login failed for email: {}", loginRequest.getEmail());
                return ResponseEntity.badRequest().body("Invalid credentials");
            }
        } catch (Exception e) {
            logger.error("Error during login for email: {}", loginRequest.getEmail(), e);
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        logger.info("Received registration request for: {}", registerRequest.getEmail());
        try {
            Employee employee = new Employee();
            employee.setFirstName(registerRequest.getFirstName());
            employee.setLastName(registerRequest.getLastName());
            employee.setEmail(registerRequest.getEmail());
            employee.setPassword(registerRequest.getPassword());
            employee.setDepartment(registerRequest.getDepartment());
            employee.setAddress(registerRequest.getAddress());
            employee.setDob(registerRequest.getDob());
            employee.setPhoneNumber(registerRequest.getPhoneNumber());
            employee.setNotes(registerRequest.getNotes());
            employee.setRole("USER"); // Set a default role

            Employee savedEmployee = employeeService.createEmployee(employee);
            logger.info("User registered successfully: {}", savedEmployee.getEmail());
            return ResponseEntity.ok(savedEmployee);
        } catch (Exception e) {
            logger.error("Error during registration for email: {}", registerRequest.getEmail(), e);
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }

    @GetMapping("/test")
    public ResponseEntity<?> testEndpoint() {
        logger.info("Test endpoint accessed");
        return ResponseEntity.ok("Test endpoint is working");
    }
}