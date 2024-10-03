package com.personnelprocapstone.capstonebackendpersonnelpro.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginResponse {
    // Getter and setter
    private String token;

    // Default constructor
    public LoginResponse() {}

    // Constructor with parameter
    public LoginResponse(String token) {
        this.token = token;
    }

}