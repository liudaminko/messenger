package com.messenger.back.repository;

import com.messenger.back.model.Chat;
import com.messenger.back.model.Message;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, Integer> {
    List<Message> findByChatId(Integer chatId);

    List<Message> findByChatIdAndMessageContaining(Integer chatId, String pattern);

    @Aggregation(pipeline = {
            "{ $match: { message: { $regex: ?0, $options: 'i' } } }",
            "{ $lookup: { from: 'chat', localField: 'chatId', foreignField: '_id', as: 'chatInfo' } }",
            "{ $unwind: '$chatInfo' }",
            "{ $match: { 'chatInfo.members': ?1 } }",
            "{ $project: { _id: '$chatInfo._id', name: '$chatInfo.name', lastMessage: '$message', lastMessageDate: '$sendTime', members: '$chatInfo.members', _class: '$chatInfo._class' } }"
    })
    List<Chat> findByMessageContaining(String pattern, Integer userId);

    void deleteByChatId(Integer chatId);
}
