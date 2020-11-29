package com.whitehat;

import org.jdbi.v3.core.Jdbi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy;

import javax.sql.DataSource;

/**
 * Jdbi provides convenient, idiomatic access to relational data in Java.
 * It is built on top of JDBC and provides a more natural Java database interface
 * that is easy to bind to your domain data types.
 */
@Configuration
public class JdbiConfiguration {

    @Bean
    public Jdbi jdbi(DataSource ds) {
        TransactionAwareDataSourceProxy proxy = new TransactionAwareDataSourceProxy(ds);
        return Jdbi.create(proxy);
    }
}