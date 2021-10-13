package com.multiverse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Defines the RESTful API supported by this SpringBoot application.
 */
@RestController
public class MessagesController {

    @Autowired
    private MessagesRepository repository;

    @GetMapping("/messages")
    List<Message> findAll() {
        return repository.findAll();
    }

    @GetMapping("/messages/{id}")
    Message findMessage(@PathVariable String id) {
        return repository.find(id);
    }

    @PostMapping("/messages")
    @ResponseStatus(HttpStatus.CREATED)
    String createMessage(@RequestBody Message message,  HttpServletResponse response) {
        if (1==repository.create(message)) {
            return "{message:\"success\"}";
        } else {
            response.setStatus(404); // TODO - proper error handling
            return "{error:\"not found\"}";
        }
    }

    @PutMapping("/messages/{id}")
    String updateMessage(@RequestBody Message message,  @PathVariable int id, HttpServletResponse response) {
        if (1==repository.update(id, message)) {
            return "{message:\"success\"}";
        } else {
            response.setStatus(404); // TODO - proper error handling
            return "{error:\"not found\"}";
        }
    }

    @DeleteMapping("/messages/{id}")
    String deleteMessage(@PathVariable String id,  HttpServletResponse response) {
        if (1==repository.delete(id)) {
            return "{message:\"success\"}";
        } else {
            response.setStatus(404); // TODO - proper error handling
            return "{error:\"not found\"}";
        }
    }
}
