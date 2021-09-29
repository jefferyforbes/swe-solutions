package com.whitehat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Defines the RESTful API supported by this SpringBoot application.
 */
@RestController
public class UsersController {

    @Autowired
    private UsersRepository repository;

    @GetMapping("/users")
    List<User> findAll() {
        return repository.findAll();
    }

    @GetMapping("/users/{id}")
    User findUser(@PathVariable String id) {
        return repository.find(id);
    }

    @PostMapping("/users")
    @ResponseStatus(HttpStatus.CREATED)
    String createUser(@RequestBody User user,  HttpServletResponse response) {
        if (1==repository.create(user)) {
            return "{message:\"success\"}";
        } else {
            response.setStatus(404); // TODO - proper error handling
            return "{error:\"not found\"}";
        }
    }

    @PutMapping("/users/{id}")
    String updateUser(@RequestBody User user,  @PathVariable int id, HttpServletResponse response) {
        if (1==repository.update(id, user)) {
            return "{message:\"success\"}";
        } else {
            response.setStatus(404); // TODO - proper error handling
            return "{error:\"not found\"}";
        }
    }

    @DeleteMapping("/users/{id}")
    String deleteUser(@PathVariable String id,  HttpServletResponse response) {
        if (1==repository.delete(id)) {
            return "{message:\"success\"}";
        } else {
            response.setStatus(404); // TODO - proper error handling
            return "{error:\"not found\"}";
        }
    }
}
