package com.capstone.Capstone_backend.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
