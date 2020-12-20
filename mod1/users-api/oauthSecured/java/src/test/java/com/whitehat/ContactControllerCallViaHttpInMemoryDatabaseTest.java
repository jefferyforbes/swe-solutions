package com.whitehat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

/**
 * JUnit to test the ContactsController logic via HTTP and using H2 in-memory database
 *
 */
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        classes = ContactsApplication.class) // TODO - consider port numbers
@ActiveProfiles("test")
public class ContactControllerCallViaHttpInMemoryDatabaseTest {

    private static final ObjectMapper om = new ObjectMapper();

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ContactsRepository inMemoryRepository;

    @MockBean
    private JwtDecoder mockedJwtDecoder;

    @Before
    public void init() {
    }

    @Test
    public void find_allContacts_OK() throws Exception {

        List<Contact> contacts = Arrays.asList(
                new Contact("fred", "flintstone"),
                new Contact("wilma", "flintstone"));

        String expected = om.writeValueAsString(contacts);

        Jwt token = Jwt.withTokenValue("token")
                .header("alg", "none")
                .claim("scope", "message:read")
                .build();

        when(mockedJwtDecoder.decode(anyString())).thenReturn(token);

        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
        headers.add("Authorization", "Bearer " + "accessToken");
        ResponseEntity<String> response = restTemplate.exchange(
                "/contacts/me", HttpMethod.GET, new HttpEntity<Object>(headers),
                String.class);

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
