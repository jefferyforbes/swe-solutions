package com.whitehat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * JUnit to test the ContactsController logic without requiring a running container
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class ContactControllerTest {

    private static final ObjectMapper om = new ObjectMapper();

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ContactsRepository mockRepository;

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

        when(mockRepository.findAll()).thenReturn(contacts);

        Jwt token = Jwt.withTokenValue("token")
                .header("alg", "none")
                .claim("scope", "message:read")
                .build();

        when(mockedJwtDecoder.decode(anyString())).thenReturn(token);

        mockMvc.perform(get("/contacts/me").header("Authorization", "Bearer " + "accessToken"))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].firstName", is("fred")))
                .andExpect(jsonPath("$[0].lastName", is("flintstone")));

        verify(mockRepository, times(1)).findAll();
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