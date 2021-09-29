DROP TABLE IF EXISTS USERS;

CREATE TABLE USERS (
  id BIGINT auto_increment,
  username VARCHAR(250) NOT NULL,
  password VARCHAR(250) NOT NULL,
  firstname VARCHAR(250) NOT NULL,
  lastname VARCHAR(250) NOT NULL
);

INSERT INTO USERS (username, password, firstname, lastname) VALUES
  ('fr1', '$2b$10$Qn3/3pESn54pkxQQ8QXDH.q2J3N6PI4EsjIoa4Om5iB6uJHWJSN5m', 'fred', 'flintstone'),
  ('wm1', '$2b$10$sywsA.PfWohFxCT0vC6zjuu2oopYjBBCAd9/xLl1W9esF5Cfjqle.', 'wilma', 'flintstone'),
  ('admin', '$2b$10$AEtGlfHW/ljShQERuACf6.GkfJwcU3RzaW/uAEn.HAwv0WRRCS3uC', 'admin', 'Istrator');
