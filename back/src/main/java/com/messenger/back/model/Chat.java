package com.messenger.back.model;

import org.springframework.cglib.core.Local;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "chat")
public class Chat {
    @Id
    private int id;
    private LocalDateTime creationTime;
    private String name;
    private String profilePicture;
    private String lastMessage;
    private LocalDateTime lastMessageDate;
    private List<Integer> members;

    public static final String SEQUENCE_NAME = "chats_sequence";

    public Chat(int id, String name, String profilePicture, String lastMessage, LocalDateTime lastMessageDate, List<Integer> members) {
        this.id = id;
        this.creationTime = LocalDateTime.now();
        this.name = name;
        this.profilePicture = profilePicture;
        this.lastMessage = lastMessage;
        this.lastMessageDate = lastMessageDate;
        this.members = members;
    }

    public Chat() {

    }
    // Getters and setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDateTime getCreationTime() {
        return creationTime;
    }

    public void setCreationTime(LocalDateTime creationTime) {
        this.creationTime = creationTime;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }

    public LocalDateTime getLastMessageDate() {
        return lastMessageDate;
    }

    public void setLastMessageDate(LocalDateTime lastMessageDate) {
        this.lastMessageDate = lastMessageDate;
    }

    public List<Integer> getMembers() {
        return members;
    }

    public void setMembers(List<Integer> members) {
        this.members = members;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
