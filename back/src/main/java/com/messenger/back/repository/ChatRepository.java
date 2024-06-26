package com.messenger.back.repository;

import com.messenger.back.model.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ChatRepository extends MongoRepository<Chat, Integer> {
    //@Query("{ 'name' : ?0 }")
    //List<Chat> findByName(String name);

    List<Chat> findByMembersContaining(Integer userId);

}
