package org.example;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Hash 
{
    public static void main( String[] args ) {

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode("your password");

        System.out.println(hashedPassword );

        boolean isMatch = passwordEncoder.matches("your password", "$2b$10$AQXoVkfzAovJ9RHTtmd6N.Yegy3V9ALTlYDcCM76HxBqq044q6xLK");
    }
}
