package com.personnelprocapstone.capstonebackendpersonnelpro.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import com.personnelprocapstone.capstonebackendpersonnelpro.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    // You can add custom queries here if needed, such as finding users by username
}
