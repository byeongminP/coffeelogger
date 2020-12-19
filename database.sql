CREATE DATABASE coffeelog;

CREATE TABLE users (
  google_id SERIAL PRIMARY KEY,
  google_profile VARCHAR(2047),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE coffeelog (
  log_id SERIAL PRIMARY KEY,
  author VARCHAR(2047),
  coffee_name VARCHAR(63),
	coffee_roaster VARCHAR(63),
	coffee_date VARCHAR(63),
  brew_date VARCHAR(63),
	brew_method VARCHAR(63),
	brew_grind VARCHAR(63),
	brew_dose VARCHAR(63),
	brew_yield VARCHAR(63),
	brew_temp VARCHAR(63),
	brew_time VARCHAR(63),
	description VARCHAR(255),
	taste VARCHAR(63),
	comments VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
