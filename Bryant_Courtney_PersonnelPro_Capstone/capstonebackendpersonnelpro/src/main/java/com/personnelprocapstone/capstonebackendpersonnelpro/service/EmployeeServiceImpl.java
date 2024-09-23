package com.personnelprocapstone.capstonebackendpersonnelpro.service;

import com.personnelprocapstone.capstonebackendpersonnelpro.dto.EmployeeDto;
import com.personnelprocapstone.capstonebackendpersonnelpro.entity.Employee;
import com.personnelprocapstone.capstonebackendpersonnelpro.mapper.EmployeeMapper;
import com.personnelprocapstone.capstonebackendpersonnelpro.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private EmployeeRepository employeeRepository;

    public EmployeeDto createNewEmployee(EmployeeDto employeeDto){
        Employee newEmployee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(newEmployee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }
}
