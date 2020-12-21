package com.whitehat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;

/**
 * JUnit to test the ContactsController logic via HTTP and using H2 in-memory database
 *
 */
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        classes = UsersApplication.class) // TODO - consider port numbers
@ActiveProfiles("test")
public class UserControllerCallViaHttpInMemoryDatabaseTest {

    private static final ObjectMapper om = new ObjectMapper();

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UsersRepository inMemoryRepository;

    @Before
    public void init() {
    }

    @Test
    public void find_allContacts_OK() throws Exception {

        List<User> users = Arrays.asList(
                new User(1, "fr1", "$2b$10$Qn3/3pESn54pkxQQ8QXDH.q2J3N6PI4EsjIoa4Om5iB6uJHWJSN5m", "fred", "flintstone"),
                new User(2, "wm1", "$2b$10$sywsA.PfWohFxCT0vC6zjuu2oopYjBBCAd9/xLl1W9esF5Cfjqle.", "wilma", "flintstone"),
                new User(3, "admin", "$2b$10$AEtGlfHW/ljShQERuACf6.GkfJwcU3RzaW/uAEn.HAwv0WRRCS3uC", "admin", "Istrator"));

        String expected = om.writeValueAsString(users);

        ResponseEntity<String> response = restTemplate.withBasicAuth("admin", "secret")
                .getForEntity("/users", String.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        JSONAssert.assertEquals(expected, response.getBody(), false);

    }

    private static void printJSON(Object object) {
        String result;
        try {
            result = om.writerWithDefaultPrettyPrinter().writeValueAsString(object);
            System.out.println(result);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

}
