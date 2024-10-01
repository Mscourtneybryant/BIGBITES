package com.personnelprocapstone.capstonebackendpersonnelpro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.personnelprocapstone.capstonebackendpersonnelpro.entity.User;
import com.personnelprocapstone.capstonebackendpersonnelpro.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestParam String username, @RequestParam String password, @RequestParam Long employeeId) {
        return userService.createUser(username, password, employeeId);
    }
}
