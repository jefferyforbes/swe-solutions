package com.whitehat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hsqldb.cmdline.SqlFile;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.ClassRule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;

/**
 * JUnit to test the ContactsController logic via HTTP and using a Postgres db running in
 * a test Docker container
 *
 */
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        classes = ContactsApplication.class) // TODO - consider port numbers
@ActiveProfiles("test")
@Testcontainers
@ContextConfiguration(initializers = {ContactControllerCallWithDockerisedPostgresTest.Initializer.class})
public class ContactControllerCallWithDockerisedPostgresTest {

    private static final ObjectMapper om = new ObjectMapper();

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ContactsRepository repository;

    @Before
    public void init() {
    }

    @ClassRule
    public static final PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:latest")
            .withDatabaseName("testdb")
            .withUsername("postgres")
            .withPassword("docker");

    /**
     * Override the Spring Datasource properties
     */
    static class Initializer
            implements ApplicationContextInitializer<ConfigurableApplicationContext> {
        public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
            TestPropertyValues.of(
                    "spring.datasource.url=" + postgres.getJdbcUrl(),
                    "spring.datasource.username=" + postgres.getUsername(),
                    "spring.datasource.password=" + postgres.getPassword(),
                    "spring.datasource.driver-class-name=" + postgres.getDriverClassName()

            ).applyTo(configurableApplicationContext.getEnvironment());

        }
    }

    /**
     * Initialise the database
     *
     * @throws Exception if a problem occurs
     */
    @BeforeClass
    public static void initDatabase()
            throws Exception {
        String jdbcUrl = postgres.getJdbcUrl();
        String username = postgres.getUsername();
        String password = postgres.getPassword();
        Connection conn = DriverManager
                .getConnection(jdbcUrl, username, password);

        try(InputStream inputStream = ContactControllerCallWithDockerisedPostgresTest.class.getResourceAsStream("/init.sql")) {
            SqlFile sqlFile = new SqlFile(new InputStreamReader(inputStream), "init", System.out, "UTF-8", false, new File("."));
            sqlFile.setConnection(conn);
            sqlFile.execute();
        }
    }

    @Test
    public void find_allContacts_OK() throws Exception {

        List<Contact> contacts = Arrays.asList(
                new Contact("fred", "flintstone"),
                new Contact("wilma", "flintstone"));

        String expected = om.writeValueAsString(contacts);

        ResponseEntity<String> response = restTemplate.withBasicAuth("admin", "nimda")
                .getForEntity("/contacts/me", String.class);

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
