package com.capstone.Capstone_backend.Service;

import com.capstone.Capstone_backend.model.USER_ROLE;
import com.capstone.Capstone_backend.model.User;
import com.capstone.Capstone_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service //to give the user ability to create their own password
public class CustomerUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        User user=userRepository.findByEmail(username);
        if(user==null){
            throw new UsernameNotFoundException("user not found with email" +username);
        }
        USER_ROLE role=user.getRole();
        if(role==null)role=USER_ROLE.ROLE_CUSTOMER;
        List<GrantedAuthority> authorities=new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority(role.toString()));
      return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),authorities);
    }
}
