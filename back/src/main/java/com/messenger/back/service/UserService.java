package com.messenger.back.service;

import com.messenger.back.dto.NewUserDTO;
import com.messenger.back.model.User;
import com.messenger.back.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final SequenceGeneratorService sequenceGenerator;
    private final AwsS3Service s3Service;

    public UserService(UserRepository userRepository, SequenceGeneratorService sequenceGenerator, AwsS3Service s3Service) {
        this.userRepository = userRepository;
        this.sequenceGenerator = sequenceGenerator;
        this.s3Service = s3Service;
    }

    public NewUserDTO addUser(NewUserDTO user) {
        User newUser = new User(sequenceGenerator.generateSequence(User.SEQUENCE_NAME), user.getPhoneNumber());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        if (user.getProfilePicture() != null) {
            newUser.setProfilePicture(s3Service.uploadImage(user.getProfilePicture()));
        }
        newUser = userRepository.insert(newUser);
        return new NewUserDTO()
                .setId(newUser.getId())
                .setFirstName(newUser.getFirstName())
                .setLastName(newUser.getLastName())
                .setPhoneNumber(newUser.getPhoneNumber())
                .setProfilePicture(newUser.getProfilePicture());
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
    public Optional<User> getUserByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber);
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
