package com.messenger.back.controller;

import com.messenger.back.model.Chat;
import com.messenger.back.service.ChatService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
@CrossOrigin
public class ChatController {
    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ResponseEntity<Void> addChat(@RequestBody Chat chat) {
        chatService.addChat(chat);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<Void> updateChat(@RequestBody Chat chat) {
        chatService.updateChat(chat);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Chat>> getAllChats() {
        return ResponseEntity.ok(chatService.getAllChats());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Chat> getChatById(@PathVariable Integer id) {
        return ResponseEntity.ok(chatService.getChatById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Chat>> getChatsByUserId(@PathVariable Integer userId) {
        return ResponseEntity.ok(chatService.getChatsByUserId(userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChat(@PathVariable Integer id) {
        chatService.deleteChat(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
