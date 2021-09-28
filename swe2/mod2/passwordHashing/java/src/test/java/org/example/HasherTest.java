package org.example;

import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Unit test
 */
public class HasherTest
{
    @Test
    public void hash_unique() {
        String hash1 = Hasher.hash("password1");
        String hash2 = Hasher.hash("password1");

        assertNotEquals(hash1, hash2);
    }

    @Test
    public void hash_match() {
        String hashedPassword = Hasher.hash("some password");
        assertTrue(Hasher.isMatch("some password", hashedPassword));
    }

}
