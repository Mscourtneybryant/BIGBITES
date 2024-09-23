package com.personnelprocapstone.capstonebackendpersonnelpro.mapper;

import com.personnelprocapstone.capstonebackendpersonnelpro.dto.EmployeeDto;
import com.personnelprocapstone.capstonebackendpersonnelpro.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee){
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail()
        );
    }

    public static Employee mapToEmployee(EmployeeDto employeeDto){
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail()
        );
    }
}
