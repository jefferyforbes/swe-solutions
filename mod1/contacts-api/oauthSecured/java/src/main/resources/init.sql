DROP TABLE IF EXISTS CONTACTS;

CREATE TABLE CONTACTS (
  firstName VARCHAR(250) NOT NULL,
  lastName VARCHAR(250) NOT NULL
);


INSERT INTO CONTACTS (firstName, lastName) VALUES
  ('fred', 'flintstone'),
  ('wilma', 'flintstone');