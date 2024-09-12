package com.capstone.Capstone_backend.Service;

import com.capstone.Capstone_backend.config.JwtProvider;
import com.capstone.Capstone_backend.model.User;
import com.capstone.Capstone_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImp implements UserService{

    @Autowired
    UserRepository userRepository;

    private JwtProvider jwtProvider;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
       String email=jwtProvider.getEmailFromJwtToken(jwt);
       User user=findUserByEmail(email);

        return user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user=userRepository.findByEmail(email);

        if(user==null){
            throw new Exception("User not found");
        }

        return user;
    }
}
