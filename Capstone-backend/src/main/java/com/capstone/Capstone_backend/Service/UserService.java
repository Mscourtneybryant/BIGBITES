package com.capstone.Capstone_backend.Service;

import com.capstone.Capstone_backend.model.User;

public interface UserService {

    public User findUserByJwtToken(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;


}
