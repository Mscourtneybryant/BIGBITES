package com.capstone.Capstone_backend.repository;


import com.capstone.Capstone_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User,Long> {

    public User findByEmail(String username);

}
