package com.personnelprocapstone.capstonebackendpersonnelpro.service;

import com.personnelprocapstone.capstonebackendpersonnelpro.entity.Employee;
import com.personnelprocapstone.capstonebackendpersonnelpro.repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

    private final EmployeeRepository employeeRepository;

    public CustomUserDetailsService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        logger.info("Attempting to load user details for email: {}", email);

        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> {
                    logger.error("User not found with email: {}", email);
                    return new UsernameNotFoundException("User not found with email: " + email);
                });

        String role = employee.getRole() != null ? employee.getRole().toUpperCase() : "USER";
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role);

        logger.info("User found with email: {}. Assigned role: {}", email, role);

        return new User(employee.getEmail(), employee.getPassword(), Collections.singletonList(authority));
    }
}