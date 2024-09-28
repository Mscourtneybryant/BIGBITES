package com.personnelprocapstone.capstonebackendpersonnelpro.Auth;

public class JwtResponse {
    private String token;

    // Constructor
    public JwtResponse(String token) {
        this.token = token;
    }

    // Getter for token
    public String getToken() {
        return token;
    }

    // Optional: toString method for better readability when printing
    @Override
    public String toString() {
        return "JwtResponse{token='" + token + "'}";
    }
}
