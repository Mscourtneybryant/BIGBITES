package com.capstone.Capstone_backend.response;

import com.capstone.Capstone_backend.model.USER_ROLE;
import lombok.Data;

@Data
public class AuthResponse {

    private String jwt;
    private String message;
    private USER_ROLE role;
}
