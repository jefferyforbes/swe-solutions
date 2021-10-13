DROP TABLE IF EXISTS AUTHORITIES;
DROP TABLE IF EXISTS USERS;
DROP TABLE IF EXISTS MESSAGES;


CREATE TABLE USERS (
  id BIGINT auto_increment,
  username VARCHAR(250) NOT NULL,
  password VARCHAR(250) NOT NULL,
  firstname VARCHAR(250) NOT NULL,
  lastname VARCHAR(250) NOT NULL
);

CREATE TABLE AUTHORITIES (
  username VARCHAR(50) NOT NULL,
  authority VARCHAR(50) NOT NULL,
  FOREIGN KEY (username) REFERENCES USERS(username)
);

CREATE UNIQUE INDEX ix_auth_username
  on AUTHORITIES (username,authority);

CREATE TABLE MESSAGES (
  id BIGINT auto_increment,
  message VARCHAR(250) NOT NULL
);

INSERT INTO USERS (username, password, firstname, lastname) VALUES
  ('admin', '$2b$10$AEtGlfHW/ljShQERuACf6.GkfJwcU3RzaW/uAEn.HAwv0WRRCS3uC', 'admin', 'Istrator');

INSERT INTO authorities (username, authority) VALUES
     ('admin', 'ROLE_USER');

INSERT INTO messages (message) VALUES ('hello'), ('hello again'), ('goodbye');