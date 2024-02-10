DROP DATABASE IF exists blog_db;
CREATE DATABASE blog_db;
-- Connect to the desired database
\c blog_db;

CREATE TABLE users
(
    sub character varying NOT NULL PRIMARY KEY,
    name character varying NOT NULL,
    picture character varying,
    email character varying,
    is_admin boolean DEFAULT false
);

INSERT into users (sub, name, picture, email, is_admin)
VALUES ('1', 'admin', 'https://icons.veryicon.com/png/o/miscellaneous/yuanql/icon-admin.png', 'admin@admin.com', true);

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
VALUES ('Exploring the Wonders of the Natural World',
 'The natural world is full of wonders that await those eager to explore them. From the towering peaks of the Himalayas to the dense, life-rich Amazon rainforest, every corner of the planet holds secrets that have fascinated humans for centuries. This journey begins at the edge of the world''s highest waterfall, Angel Falls, where water cascades down 979 meters into the Kerep River below. The sound of the water, the mist in the air, and the lush greenery that surrounds the falls create a scene of unparalleled beauty. As we move from the majestic waterfalls to the serene landscapes of the Scottish Highlands, the contrast couldn''t be more striking. The Highlands, with their rolling hills, deep blue lochs, and ancient castles, offer a peaceful retreat from the fast-paced modern world. This exploration of the natural world is not just a journey through beautiful landscapes; it''s an invitation to connect with the planet on a deeper level. It''s a reminder of the fragile beauty that we must protect for future generations.',
  'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg',
   DATE '2023-01-01', '1'),
('The Future of Technology: Innovations That Will Shape Our World',
 'The future of technology is unfolding before our eyes, promising to transform every aspect of our lives. From self-driving cars to AI-powered personal assistants, the next decade will see the rise of innovations that were once confined to the realm of science fiction. One of the most anticipated advancements is in the field of quantum computing. Quantum computers, with their ability to process information at speeds unimaginable with today''s technology, could revolutionize fields such as medicine, cryptography, and artificial intelligence. Meanwhile, the development of sustainable energy solutions is set to address the pressing issue of climate change. Innovations like fusion energy and next-generation solar panels are on the horizon, offering hope for a cleaner, more sustainable future. As we stand on the brink of these technological revolutions, it''s clear that the future holds challenges but also incredible opportunities for growth and improvement.',
  'https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg',
   DATE '2023-01-02', '1'),
('Culinary Adventures: Discovering the World Through Food',
'Food is more than just sustenance; it''s a window into the cultures and traditions of the world. Our culinary adventure begins in the bustling streets of Bangkok, Thailand, where street food vendors offer an array of dishes bursting with flavors of sweet, sour, and spicy. From there, we travel to Italy, where the art of pasta making has been perfected over centuries. Tasting freshly made pasta in a small, family-run trattoria in Rome offers not just a meal but an experience, connecting us with generations of culinary tradition. As we continue our journey, we explore the intricate spices of Indian cuisine, the bold flavors of Mexican street food, and the innovative dishes of modern Japanese gastronomy. Each meal is a discovery, an opportunity to explore new flavors, and a reminder of the diverse and interconnected world we live in.',
 'https://images.pexels.com/photos/3735604/pexels-photo-3735604.jpeg',
 DATE '2023-01-03', '1'),
('Fourth Post', 'This is my fourth post', NULL, DATE '2023-01-04', '1'),
('Fifth Post', 'This is my fifth post', 'https://images.pexels.com/photos/3861955/pexels-photo-3861955.jpeg', DATE '2023-01-05', '1'),
('Sixth Post', 'This is my sixth post', 'https://images.pexels.com/photos/3861955/pexels-photo-3861955.jpeg', DATE '2023-01-05', '1');