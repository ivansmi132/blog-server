DROP DATABASE IF exists blog_db;
CREATE DATABASE blog_db;
-- Connect to the desired database
\c blog_db;

CREATE TABLE users
(
    sub character varying NOT NULL PRIMARY KEY,
    name character varying NOT NULL,
    picture character varying
);

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
VALUES ('First Post', 'This is my first post!', 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg', DATE '2023-01-01', '104251157111353950411'),
('Second Post', 'This is my second post', 'https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg', DATE '2023-01-02', '104251157111353950411'),
('Third Post', 'This is my third post', 'https://images.pexels.com/photos/3735604/pexels-photo-3735604.jpeg', DATE '2023-01-03', '104251157111353950411'),
('Fourth Post', 'This is my fourth post', NULL, DATE '2023-01-04', '104251157111353950411'),
('Fifth Post', 'This is my fifth post', 'https://images.pexels.com/photos/3861955/pexels-photo-3861955.jpeg', DATE '2023-01-05', '104251157111353950411');

INSERT INTO post (title, content, image_url, creation_date, posted_by)
SELECT CONCAT('Post ', id),
       CONCAT('Content for post ', id),
       'https://picsum.photos/500/300?random=' || id,
       DATE ('2023-01-' || (MOD(id, 28) + 1)),
       '104251157111353950411'
FROM generate_series(6, 60) AS id;




