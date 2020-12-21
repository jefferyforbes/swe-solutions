package com.whitehat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;

/**
 * Specify that all REST resources are protected by Basic Auth.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private DataSource dataSource;

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        // do not use the line below in production apps!!
        httpSecurity.csrf().disable(); // hack to support DELETE method
        httpSecurity.authorizeRequests().anyRequest().authenticated()
                .and().httpBasic();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder authentication)
            throws Exception {
        // use jdbc authentication (for in memory authentication use authentication.inMemoryAuthentication())
        authentication.jdbcAuthentication()
                .dataSource(dataSource)
                .authoritiesByUsernameQuery("select username,authority "
                        + "from authorities "
                        + "where username = ?")
                .usersByUsernameQuery(
                        "select username, password, 'true' as enabled from users where username = ?");

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // specify we want the password hashed using bcrypt
        return new BCryptPasswordEncoder();
    }
}
