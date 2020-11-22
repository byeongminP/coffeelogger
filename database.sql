CREATE DATABASE coffeelog;

CREATE TABLE users (
  google_id SERIAL PRIMARY KEY,
  google_profile VARCHAR(2047),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE coffeelog (
  log_id SERIAL PRIMARY KEY,
  log_num VARCHAR(31),
  author VARCHAR(2047),
  description VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
