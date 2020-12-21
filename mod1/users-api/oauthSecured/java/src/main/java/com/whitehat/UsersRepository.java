package com.whitehat;

import org.jdbi.v3.core.Jdbi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repository that uses JDBI with bind variables to prevent SQL injection.
 */
@Repository
public class UsersRepository {
    @Autowired
    private Jdbi jdbi;

    public List<User> findAll() {
        System.out.println("got here 2");

        // handles represent an active database connection
        return jdbi.withHandle(handle -> {
            return handle.createQuery("select * from USERS")
                    .mapToBean(User.class)
                    .list();
        });
    }

    public User find(String id) {
        // handles represent an active database connection
        return jdbi.withHandle(handle -> {
            return handle.createQuery("select * from USERS where id = :id")
                    .bind("id", id)
                    .mapToBean(User.class)
                    .first();
        });
    }

    public int create(User user) {
        // handles represent an active database connection
        return jdbi.withHandle(handle -> {
            System.out.println("user fname:"+user.getFirstname());

            return handle.createUpdate("insert into Users (username, password, firstname, lastname) " +
                    "values (:username, :password, :firstname, :lastname)")
                    .bind("username", user.getUsername())
                    .bind("password", user.getPassword())
                    .bind("firstname", user.getFirstname())
                    .bind("lastname", user.getLastname())
                    .execute();
        });
    }

    public int update(int id, User user) {
        // handles represent an active database connection
        return jdbi.withHandle(handle -> {
            return handle.createUpdate("update Users set firstname = :firstname, lastname = :lastname where id = :id")
                    .bind("id", id)
                    .bind("firstname", user.getFirstname())
                    .bind("lastname", user.getLastname())
                    .execute();
        });
    }

    public int delete(String id) {
        // handles represent an active database connection
        return jdbi.withHandle(handle -> {
            return handle.createUpdate("delete from Users where id = :id")
                    .bind("id", id)
                    .execute();
        });
    }
}