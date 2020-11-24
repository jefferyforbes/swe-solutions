package com.whitehat;

import org.jdbi.v3.core.Jdbi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repository that uses JDBI with bind variables to prevent SQL injection.
 */
@Repository
public class ContactsRepository {
    @Autowired
    private Jdbi jdbi;

    public List<Contact> findAll() {
        // handles represent an active database connection
        return jdbi.withHandle(handle -> {
            return handle.createQuery("select * from Contacts")
                    .mapToBean(Contact.class)
                    .list();
        });

    }
}