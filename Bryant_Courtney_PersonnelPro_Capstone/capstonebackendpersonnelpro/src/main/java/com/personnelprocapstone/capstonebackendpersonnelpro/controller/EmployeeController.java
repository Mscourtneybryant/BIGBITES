package com.personnelprocapstone.capstonebackendpersonnelpro.controller;

import com.personnelprocapstone.capstonebackendpersonnelpro.entity.Employee;
import com.personnelprocapstone.capstonebackendpersonnelpro.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        logger.info("Fetching all employees");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        logger.info("User {} is requesting all employees", authentication.getName());
        logger.info("User authorities: {}", authentication.getAuthorities());
        List<Employee> employees = employeeService.getAllEmployees();
        logger.info("Found {} employees", employees.size());
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        logger.info("Fetching employee with id: {}", id);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        logger.info("User {} is requesting employee with id: {}", authentication.getName(), id);
        Employee employee = employeeService.getEmployeeById(id);
        logger.info("Found employee: {}", employee);
        return ResponseEntity.ok(employee);
    }

    @PostMapping
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        logger.info("Adding new employee: {}", employee);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        logger.info("User {} is adding a new employee", authentication.getName());
        Employee newEmployee = employeeService.addEmployee(employee);
        logger.info("Added new employee with id: {}", newEmployee.getId());
        return ResponseEntity.ok(newEmployee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        logger.info("Updating employee with id: {}", id);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        logger.info("User {} is updating employee with id: {}", authentication.getName(), id);
        Employee updatedEmployee = employeeService.updateEmployee(id, employeeDetails);
        logger.info("Updated employee: {}", updatedEmployee);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        logger.info("Deleting employee with id: {}", id);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        logger.info("User {} is deleting employee with id: {}", authentication.getName(), id);
        employeeService.deleteEmployee(id);
        logger.info("Deleted employee with id: {}", id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity<Employee> registerEmployee(@RequestBody Employee employee) {
        logger.info("Registering new employee: {}", employee);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        logger.info("User {} is registering a new employee", authentication.getName());
        Employee newEmployee = employeeService.createEmployee(employee);
        logger.info("Registered new employee with id: {}", newEmployee.getId());
        return ResponseEntity.ok(newEmployee);
    }
}