package com.messenger.back.service;

import com.messenger.back.model.Chat;
import com.messenger.back.model.Message;
import com.messenger.back.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final ApplicationEventPublisher eventPublisher;

    public MessageService(MessageRepository messageRepository, ApplicationEventPublisher eventPublisher) {
        this.messageRepository = messageRepository;
        this.eventPublisher = eventPublisher;
    }

    public void addMessage(Message message) {
        messageRepository.insert(message);
        eventPublisher.publishEvent(new MessageCreatedEvent(this, message));
    }

//    public void updateMessage(Message message) {
//        Message savedMessage = messageRepository.findById(message.getId()).orElseThrow(() -> new RuntimeException(
//                String.format("Cannot find message by ID %s", message.getId())
//        ));
//
//        savedMessage.setMessage(message.getMessage());
//        savedMessage.setSendTime(message.getSendTime());
//        savedMessage.setSenderId(message.getSenderId());
//        savedMessage.setChatId(message.getChatId());
//
//        messageRepository.save(savedMessage);
//    }

    public List<Message> getMessagesByChatId(Integer chatId) {
        return messageRepository.findByChatId(chatId);
    }

    public List<Chat> getChatByMessagePattern(Integer userId, String pattern) {
        return messageRepository.findByMessageContaining(pattern, userId);
    }

    public Message getMessageById(Integer id) {
        return messageRepository.findById(id).orElse(null);
    }

    public void deleteMessage(Integer id) {
        messageRepository.deleteById(id);
    }

    public void deleteAllMessages(Integer chatId) {
        messageRepository.deleteByChatId(chatId);
    }
}
