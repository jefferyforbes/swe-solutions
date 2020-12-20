DROP TABLE IF EXISTS USERS;

CREATE TABLE USERS (
  id BIGINT auto_increment,
  username VARCHAR(250) NOT NULL,
  password VARCHAR(250) NOT NULL,
  firstname VARCHAR(250) NOT NULL,
  lastname VARCHAR(250) NOT NULL
);

INSERT INTO USERS (username, password, firstname, lastname) VALUES
  ('ff1', '$2b$10$fDIutLdpDw8lOH2KNepXgua5Kg2/MLou4lJpVPOAZMW7rTQ7h6tra', 'fred', 'flintstone'),
  ('wf1', '$2b$10$fDIutLdpDw8lOH2KNepXgua5Kg2/MLou4lJpVPOAZMW7rTQ7h6tra', 'wilma', 'flintstone');