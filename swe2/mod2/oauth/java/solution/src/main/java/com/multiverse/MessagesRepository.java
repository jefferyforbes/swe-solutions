package com.multiverse;

import org.jdbi.v3.core.Jdbi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repository that uses JDBI with bind variables to prevent SQL injection.
 */
@Repository
public class MessagesRepository {
    @Autowired
    private Jdbi jdbi;

    public List<Message> findAll() {
        // handles represent an active database connection
        return jdbi.withHandle(handle -> {
            return handle.createQuery("select * from Messages")
                    .mapToBean(Message.class)
                    .list();
        });
    }

    public Message find(String id) {
        // handles represent an active database connection
        return jdbi.withHandle(handle -> {
            return handle.createQuery("select * from Messages where id = :id")
                    .bind("id", id)
                    .mapToBean(Message.class)
                    .first();
        });
    }

    public int create(Message message) {
        // handles represent an active database connection
        return jdbi.withHandle(handle -> {

            return handle.createUpdate("insert into Messages (message) " +
                    "values (:message)")
                    .bind("message", message.getMessage())
                    .execute();
        });
    }

    public int update(int id, Message message) {
        // handles represent an active database connection
        return jdbi.withHandle(handle -> {
            return handle.createUpdate("update Messages set message = :message where id = :id")
                    .bind("id", id)
                    .bind("message", message.getMessage())
                    .execute();
        });
    }

    public int delete(String id) {
        // handles represent an active database connection
        return jdbi.withHandle(handle -> {
             return handle.createUpdate("delete from Messages where id = :id")
                    .bind("id", id)
                    .execute();
        });
    }
}