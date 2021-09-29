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
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.Base64Utils;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * JUnit to test the UsersController logic without requiring a running container
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class UserControllerTest {

    private static final ObjectMapper om = new ObjectMapper();

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UsersRepository mockRepository;

    @MockBean
    private JwtDecoder mockedJwtDecoder;

    @Before
    public void init() {

    }

    @Test
    public void find_allUsers_OK() throws Exception {

        List<User> users = Arrays.asList(
                new User(1, "fr1", "$2b$10$Qn3/3pESn54pkxQQ8QXDH.q2J3N6PI4EsjIoa4Om5iB6uJHWJSN5m", "fred", "flintstone"),
                new User(2, "wm1", "$2b$10$sywsA.PfWohFxCT0vC6zjuu2oopYjBBCAd9/xLl1W9esF5Cfjqle.", "wilma", "flintstone"),
                new User(3, "admin", "$2b$10$AEtGlfHW/ljShQERuACf6.GkfJwcU3RzaW/uAEn.HAwv0WRRCS3uC", "admin", "Istrator"));

        when(mockRepository.findAll()).thenReturn(users);

        Jwt token = Jwt.withTokenValue("token")
                .header("alg", "none")
                .claim("scope", "message:read")
                .build();

        when(mockedJwtDecoder.decode(anyString())).thenReturn(token);

        mockMvc.perform(get("/users").header("Authorization", "Bearer " + "accessToken"))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].firstname", is("fred")))
                .andExpect(jsonPath("$[0].lastname", is("flintstone")));

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