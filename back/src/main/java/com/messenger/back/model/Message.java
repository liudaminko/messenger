package com.messenger.back.model;

import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.UUID;

@Document(collection = "message")
public class Message {

    private String id;
    private String message;
    private LocalDateTime sendTime;
    private int senderId;
    private int chatId;
    private String attachmentLink;

    public int getSenderId() {
        return senderId;
    }

    public void setSenderId(int senderId) {
        this.senderId = senderId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAttachmentLink() {
        return attachmentLink;
    }

    public void setAttachmentLink(String attachmentLink) {
        this.attachmentLink = attachmentLink;
    }

    public Message() {
        this.sendTime = LocalDateTime.now();
    }
    public Message(String message, int senderId, int chatId, String attachmentLink) {
        this.id = UUID.randomUUID().toString();
        this.message = message;
        this.sendTime = LocalDateTime.now();
        this.senderId = senderId;
        this.chatId = chatId;
        this.attachmentLink = attachmentLink;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getSendTime() {
        return sendTime;
    }

    public void setSendTime(LocalDateTime sendTime) {
        this.sendTime = sendTime;
    }

    public int getChatId() {
        return chatId;
    }

    public void setChatId(int chatId) {
        this.chatId = chatId;
    }


}
