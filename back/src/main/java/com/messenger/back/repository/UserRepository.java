package com.messenger.back.repository;

import com.messenger.back.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, Integer> {
    @Query("{ 'phoneNumber' : ?0 }")
    Optional<User> findByPhoneNumber(String phoneNumber);

    @Query("{ 'firstName' : ?0, 'lastName' : ?1 }")
    List<User> findByFirstNameAndLastName(String firstName, String lastName);
}
