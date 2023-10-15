CREATE TYPE user_type AS ENUM ('admin', 'student', 'expert');

-- User Table
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_type user_type NOT NULL,
  gender VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'community' table with a foreign key reference to 'post'
CREATE TABLE community (
  sub_id INT NOT NULL,
  post_id INT NOT NULL
);

-- Create the 'media' table
CREATE TABLE media (
  media_id SERIAL PRIMARY KEY,   -- Assuming a serial primary key for media
  media_link TEXT
);

-- Create the 'post' table with a foreign key reference to 'media'
CREATE TABLE post (
  sub_id INT NOT NULL,
  post_id SERIAL PRIMARY KEY,        -- Assuming a serial primary key for posts
  text_description TEXT,
  media_id INT,
  user_id INT
);

-- Create the 'comment' table with a foreign key reference to 'post'
CREATE TABLE comment (
  comment_id SERIAL PRIMARY KEY,     -- Assuming a serial primary key for comments
  post_id INT
);

-- Create the 'upvote' table with an array column for upvoted users and a foreign key reference to 'comment'
CREATE TABLE upvote (
  upvote_id SERIAL PRIMARY KEY,          -- Assuming a serial primary key for upvotes
  comment_id INT,
  upvoted_users INT[]  -- Assuming an array of user IDs who upvoted the comment
);

CREATE TABLE book (
    id serial PRIMARY KEY,
    number text,
    socialMedia text,
    duration text,
    subject text,
    chapter text,
    selectedDate date,
    selectedTime time,
    available boolean
);