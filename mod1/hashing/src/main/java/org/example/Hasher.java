package org.example;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


/**
 * Sample code showing how to hash a password using bcrypt
 */
public class Hasher
{
    public static String hash(String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(password);
    }

    public static void main( String[] args ) {
        System.out.println(Hasher.hash("some password") );
    }
}
