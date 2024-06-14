package com.messenger.back.repository;

import com.messenger.back.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, Integer> {
    List<Message> findByChatId(Integer chatId);

    List<Message> findByChatIdAndMessageContaining(Integer chatId, String pattern);
    List<Message> findByMessageContaining(String pattern);

    void deleteByChatId(Integer chatId);
}
