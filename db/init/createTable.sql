CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS board (
  board_id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description VARCHAR(255),
  owner_id INTEGER
);
CREATE TABLE IF NOT EXISTS user_board (
	user_board_id SERIAL PRIMARY KEY,
	board_id INTEGER,
  	user_id INTEGER
);
CREATE TABLE IF NOT EXISTS list (
	list_id SERIAL PRIMARY KEY,
  	name VARCHAR(255),
  	description VARCHAR(255),
  	board_id INTEGER,
  	list_position SERIAL
);
CREATE TABLE IF NOT EXISTS card (
	card_id SERIAL PRIMARY KEY,
  	name VARCHAR(255),
  	description VARCHAR(255),
  	label VARCHAR(12),
  	list_id INTEGER,
  	card_position INTEGER
);
CREATE TABLE IF NOT EXISTS user_card (
	user_card_id SERIAL PRIMARY KEY,
	card_id INTEGER,
  	user_id INTEGER
);
CREATE TABLE IF NOT EXISTS comment (
	comment_id SERIAL PRIMARY KEY,
	comment_content text,
	card_id INTEGER,
	user_id INTEGER,
	user_name TEXT,
	link_bool boolean,
	picture_bool boolean
);