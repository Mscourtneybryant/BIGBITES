package com.personnelprocapstone.capstonebackendpersonnelpro.service;

import com.personnelprocapstone.capstonebackendpersonnelpro.Auth.AuthService;
import com.personnelprocapstone.capstonebackendpersonnelpro.Exception.ResourceNotFoundException;
import com.personnelprocapstone.capstonebackendpersonnelpro.entity.Employee;
import com.personnelprocapstone.capstonebackendpersonnelpro.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Autowired
    private AuthService authService;

    // Add a new employee
    public Employee addEmployee(Employee employee) {
        // Hash the password before saving the employee
        String hashedPassword = authService.hashPassword(employee.getPassword());
        employee.setPassword(hashedPassword);
        return employeeRepository.save(employee);
    }

    // Update an existing employee
    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setAddress(employeeDetails.getAddress());
        employee.setDob(employeeDetails.getDob());
        employee.setEmail(employeeDetails.getEmail());
        employee.setPhoneNumber(employeeDetails.getPhoneNumber());
        employee.setDepartment(employeeDetails.getDepartment());
        employee.setNotes(employeeDetails.getNotes());

        // Hash and update the password if it's being changed
        if (employeeDetails.getPassword() != null) {
            String hashedPassword = authService.hashPassword(employeeDetails.getPassword());
            employee.setPassword(hashedPassword);
        }

        return employeeRepository.save(employee);
    }

    // Delete an employee
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        employeeRepository.delete(employee);
    }
}
