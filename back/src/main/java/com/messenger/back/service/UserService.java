package com.messenger.back.service;

import com.messenger.back.model.User;
import com.messenger.back.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void addUser(User user) {
        userRepository.insert(user);
    }

    public void updateUser(User user) {
        User savedUser = userRepository.findById(user.getId()).orElseThrow(() -> new RuntimeException(
                String.format("Cannot find user by ID %s", user.getId())
        ));

        savedUser.setFirstName(user.getFirstName());
        savedUser.setLastName(user.getLastName());
        savedUser.setPhoneNumber(user.getPhoneNumber());
        savedUser.setProfilePicture(user.getProfilePicture());

        userRepository.save(savedUser);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public User getUserByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber).orElseThrow(() -> new RuntimeException(
                String.format("Cannot find user by phone number %s", "phoneNumber")
        ));
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException(
                String.format("Cannot find user by ID %s", id)
        ));
    }

    public List<User> getUsersByFullName(String firstName, String lastName) {
        return userRepository.findByFirstNameAndLastName(firstName, lastName);
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
}
