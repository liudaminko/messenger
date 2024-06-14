package com.messenger.back.service;

import com.messenger.back.model.Message;
import org.springframework.context.ApplicationEvent;

public class MessageCreatedEvent extends ApplicationEvent {
    private final Message message;

    public MessageCreatedEvent(Object source, Message message) {
        super(source);
        this.message = message;
    }

    public Message getMessage() {
        return message;
    }
}

