package com.personnelprocapstone.capstonebackendpersonnelpro.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

import jakarta.persistence.*;

@Setter
@Getter
@Entity
@Table(name = "employees")
public class Employee {

    // Getters and Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "address")
    private String address;

    @Column(name = "department")
    private String department;

    @Column(name = "dob")
    private String dob;

    @Column(name = "email")
    private String email;

    @Column(name = "notes")
    private String notes;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "phone_number")
    private String phoneNumber;

    // Bidirectional One-to-One mapping to the User entity
    @OneToOne(mappedBy = "employee")
    private User user;

}
