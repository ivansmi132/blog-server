DROP DATABASE IF exists blog_db;
CREATE DATABASE blog_db;
-- Connect to the desired database
\c blog_db;

CREATE TABLE post
(
    id serial NOT NULL PRIMARY KEY,
    title character varying(100) NOT NULL,
    content character varying NOT NULL,
    image_url character varying,
    creation_date date NOT NULL,
    posted_by character varying NOT NULL
);

INSERT INTO post (title, content, image_url, creation_date, posted_by)
VALUES ('First Post', 'This is my first post!', 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg', DATE '2023-01-01', '1'),
('Second Post', 'This is my second post', 'https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg', DATE '2023-01-02', '1'),
('Third Post', 'This is my third post', 'https://images.pexels.com/photos/3735604/pexels-photo-3735604.jpeg', DATE '2023-01-03', '1');
