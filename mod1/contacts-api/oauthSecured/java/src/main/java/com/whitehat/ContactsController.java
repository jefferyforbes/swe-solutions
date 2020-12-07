package com.whitehat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Defines the RESTful API supported by this SpringBoot application.
 */
@RestController
public class ContactsController {

    @Autowired
    private ContactsRepository repository;

    @GetMapping("/contacts/me")
    List<Contact> findAll() {
        return repository.findAll();
    }

}
