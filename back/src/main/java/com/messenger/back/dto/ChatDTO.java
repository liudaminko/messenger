package com.messenger.back.dto;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "chat")
public class ChatDTO {
    private int id;
    private String name;
    private String profilePicture;
    private String lastMessage;
    private String lastMessageDate;
    private int[] members;

    public int getId() {
        return id;
    }

    public ChatDTO(int id, String name, String profilePicture, String lastMessage, String lastMessageDate, int[] members) {
        this.id = id;
        this.name = name;
        this.profilePicture = profilePicture;
        this.lastMessage = lastMessage;
        this.lastMessageDate = lastMessageDate;
        this.members = members;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getLastMessageDate() {
        return lastMessageDate;
    }

    public void setLastMessageDate(String lastMessageDate) {
        this.lastMessageDate = lastMessageDate;
    }

    public int[] getMembers() {
        return members;
    }

    public void setMembers(int[] members) {
        this.members = members;
    }


}
