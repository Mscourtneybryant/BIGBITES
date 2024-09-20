package com.capstone.Capstone_backend.controller;


import com.capstone.Capstone_backend.Service.RestaurantService;
import com.capstone.Capstone_backend.Service.UserService;
import com.capstone.Capstone_backend.model.Restaurant;
import com.capstone.Capstone_backend.model.User;
import com.capstone.Capstone_backend.request.CreateRestaurantRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {
    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;



    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurant(
            @RequestHeader("Authorization") String jwt,
            @RequestParam String keyword
    ) throws Exception{
        User user=userService.findUserByJwtToken(jwt);

        ListRestaurant restaurant=restaurantService.searchRestaurant(keyword);
        return new ResponseEntity<>(restaurant, HttpStatus.CREATED);

    }
}
