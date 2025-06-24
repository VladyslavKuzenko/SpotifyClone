drop database api;
create database api;

SELECT TABLE_SCHEMA,
       TABLE_NAME,
       COLUMN_NAME,
       ORDINAL_POSITION,
       COLUMN_DEFAULT,
       IS_NULLABLE,
       DATA_TYPE,
       CHARACTER_MAXIMUM_LENGTH,
       NUMERIC_PRECISION,
       NUMERIC_SCALE,
       COLUMN_TYPE,
       COLUMN_KEY,
       EXTRA
FROM information_schema.columns
ORDER BY TABLE_SCHEMA, TABLE_NAME, ORDINAL_POSITION;

INSERT INTO api.countries
VALUES (1, 'USA'),
       (2, 'Germany');

INSERT INTO api.goals
VALUES (1, 'Run Marathon'),
       (2, 'Read 12 books');

INSERT INTO api.users
VALUES (301, 1, 'John', 10, 5, 'Doe', 'Loves coding', 1, 'dark', 'johndoe', 1, NULL, 1),
       (302, 1, 'Jane', 15, 8, 'Smith', NULL, 1, 'light', 'janesmith', 2, NULL, NULL);

INSERT INTO api.artists
VALUES (1, 'https://www.lorempixel.com/788/861', 'Whole magazine truth stop whose.', 301),
       (2, 'https://dummyimage.com/733x447', 'Cause believe son would mouth.', 302);

INSERT INTO api.albums
VALUES (1, 'Greatest Hits', 1),
       (2, 'Acoustic Sessions', 2);

INSERT INTO api.tracks
VALUES (1, 'https://www.wheeler.com/', 'Song One', 1, 1),
       (2, NULL, 'Song Two', 2, 2);

INSERT INTO api.chats
VALUES (1, 'https://www.lorempixel.com/300/635', 'show', '2025-01-15 07:39:52'),
       (2, 'https://www.lorempixel.com/676/966', 'health', NULL);

INSERT INTO api.posts
VALUES (1, 5, 'A cool post', 10, '{"img":"x.jpg"}', 1, 2, 'Title 1', 100, 301),
       (2, 3, 'Another post', 20, '{"img":"y.jpg"}', 1, 4, 'Title 2', 200, 302);

INSERT INTO api.comments
VALUES (1, 'Language ball floor meet usually board necessary. Natural sport music white.', 1, 301),
       (2, 'Small citizen class morning. Others kind company likely.', 2, 302);

INSERT INTO api.hashtags
VALUES (1, '#music'),
       (2, '#life');

INSERT INTO api.messages
VALUES (1, '{"msg":"hello"}', 1, '2025-03-02 06:05:29', 1, 301),
       (2, '{"msg":"hey"}', 1, '2025-03-17 08:17:28', 2, 302);

INSERT INTO api.chats_messages
VALUES (1, 1),
       (2, 2);

INSERT INTO api.countries_users
VALUES (1, 301),
       (2, 302);

INSERT INTO api.goals_users
VALUES (1, 301),
       (2, 302);

INSERT INTO api.posts_comments
VALUES (1, 1),
       (2, 2);

INSERT INTO api.posts_hashtags
VALUES (1, 1),
       (2, 2);

INSERT INTO api.tracks_listenings
VALUES ('2025-02-01 12:34:56', 1, 301),
       ('2025-02-02 13:22:45', 2, 302);

INSERT INTO api.playlists
VALUES (501, 'Morning Vibes', 301),
       (502, 'Workout Hits', 302);

INSERT INTO api.tracks_playlists
VALUES (1, 501),
       (2, 502);

INSERT INTO api.users_chats
VALUES (301, 1),
       (302, 2);

INSERT INTO api.users_followings
VALUES (301, 302),
       (302, 301);

INSERT INTO api.genres
VALUES (10, 'Rock'),
       (11, 'Jazz');

INSERT INTO api.users_genres
VALUES (301, 10),
       (302, 11);

INSERT INTO api.vibes
VALUES (1, 'Chill'),
       (2, 'Energetic');

INSERT INTO api.users_vibes
VALUES (1, 301),
       (2, 302);
