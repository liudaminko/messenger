package com.messenger.back.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
public class User {
    @Id
    private int id;
    private String firstName;
    private String lastName;
    @Indexed(unique = true)
    private String phoneNumber;
    private String profilePicture;

    @Transient
    public static final String SEQUENCE_NAME = "users_sequence";


    public User(int id, String firstName, String lastName, String phoneNumber, String profilePicture) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.profilePicture = profilePicture;
    }

    public User(int id, String phoneNumber) {
        this.id = id;
        this.phoneNumber = phoneNumber;
    }

    public User() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
}
