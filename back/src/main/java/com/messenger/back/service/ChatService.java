package com.messenger.back.service;

import com.messenger.back.model.Chat;
import com.messenger.back.model.Message;
import com.messenger.back.repository.ChatRepository;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatService {
    private final ChatRepository chatRepository;

    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    public void addChat(Chat chat) {
        chatRepository.insert(chat);
    }

    public void updateChat(Chat chat) {
        Chat savedChat = chatRepository.findById(chat.getId()).orElseThrow(() -> new RuntimeException(
                String.format("Cannot find chat by ID %s", chat.getId())
        ));

        savedChat.setName(chat.getName());
        savedChat.setMembers(chat.getMembers());
        savedChat.setProfilePicture(chat.getProfilePicture());
        savedChat.setLastMessage(chat.getLastMessage());
        savedChat.setLastMessageDate(LocalDateTime.now());
        chatRepository.save(savedChat);
    }

    public List<Chat> getAllChats() {
        return chatRepository.findAll();
    }

    public Chat getChatById(Integer id) {
        return chatRepository.findById(id).orElseThrow(() -> new RuntimeException(
                String.format("Cannot find chat by ID %s", id)
        ));
    }

    public List<Chat> getChatsByUserId(Integer userId) {
        return chatRepository.findByMembersContaining(userId);
    }

    public void deleteChat(Integer id) {
        // Add logic to delete all messages before deleting the chat
        chatRepository.deleteById(id);
    }

    @EventListener
    public void handleMessageCreatedEvent(MessageCreatedEvent event) {
        Message message = event.getMessage();
        updateLastMessageAndDate(message.getChatId(), message.getMessage(), message.getSendTime());
    }

    private void updateLastMessageAndDate(Integer chatId, String lastMessage, LocalDateTime lastMessageDate) {
        Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new RuntimeException(
                String.format("Cannot find chat by ID %s", chatId)
        ));

        chat.setLastMessage(lastMessage);
        chat.setLastMessageDate(lastMessageDate);

        chatRepository.save(chat);
    }
}
