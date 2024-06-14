package com.messenger.back.controller;

import com.messenger.back.model.Message;
import com.messenger.back.service.MessageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/message")
@CrossOrigin
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public ResponseEntity addMessage(@RequestBody Message message) {
        messageService.addMessage(message);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @GetMapping("/{chatId}/messages")
    public ResponseEntity<List<Message>> getMessagesByChatId(@PathVariable Integer chatId) {
        return ResponseEntity.ok(messageService.getMessagesByChatId(chatId));
    }

    @GetMapping("/{chatId}/messages/search")
    public ResponseEntity<List<Message>> searchMessagesInChat(
            @PathVariable Integer chatId,
            @RequestParam String pattern
    ) {
        return ResponseEntity.ok(messageService.searchMessagesInChat(chatId, pattern));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Message> getMessageById(@PathVariable Integer id) {
        Message message = messageService.getMessageById(id);
        return message != null ? ResponseEntity.ok(message) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteMessage(@PathVariable Integer id) {
        messageService.deleteMessage(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    @DeleteMapping("/deleteAll/{chatId}")
    public ResponseEntity deleteAllMessages(@PathVariable Integer chatId) {
        messageService.deleteAllMessages(chatId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


}
