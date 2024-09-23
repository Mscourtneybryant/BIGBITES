package com.personnelprocapstone.capstonebackendpersonnelpro.repository;

import com.personnelprocapstone.capstonebackendpersonnelpro.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
