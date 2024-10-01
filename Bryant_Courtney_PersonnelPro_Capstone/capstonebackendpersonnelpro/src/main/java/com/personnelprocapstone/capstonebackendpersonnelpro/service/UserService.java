package com.personnelprocapstone.capstonebackendpersonnelpro.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.personnelprocapstone.capstonebackendpersonnelpro.entity.User;
import com.personnelprocapstone.capstonebackendpersonnelpro.entity.Employee;
import com.personnelprocapstone.capstonebackendpersonnelpro.repository.UserRepository;
import com.personnelprocapstone.capstonebackendpersonnelpro.repository.EmployeeRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Method to create a new user and associate it with an employee
    public User createUser(String username, String password, Long employeeId) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEnabled(true);

        // Link the user to an existing employee
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        user.setEmployee(employee);

        return userRepository.save(user);
    }
}
