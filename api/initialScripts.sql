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

select * from users;

INSERT INTO api.countries (id, name)
VALUES (1, 'USA'),
       (2, 'German');

INSERT INTO api.goals (id, title)
VALUES (1, 'Run Marathon'),
       (2, 'Read 12 books');

INSERT INTO api.users (id, allow_messages, first_name, followers_count, followings_count, last_name, short_bio,
                       show_listening_history, ui_theme, username, country_id, day_track_id, goal_id)
VALUES ("abc123", 1, 'John', 10, 5, 'Doe', 'Loves coding', 1, 'dark', 'johndoe', 1, NULL, 1),
       ("abc321", 1, 'Jane', 15, 8, 'Smith', NULL, 1, 'light', 'janesmith', 2, NULL, NULL);

INSERT INTO api.artists (id, profile_bg_url, profile_quote, user_id)
VALUES (1, 'https://www.lorempixel.com/788/861', 'Whole magazine truth stop whose.', "abc123"),
       (2, 'https://dummyimage.com/733x447', 'Cause believe son would mouth.', "abc321");

INSERT INTO api.albums (id, title, artist_id)
VALUES (1, 'Greatest Hits', 1),
       (2, 'Acoustic Sessions', 2);

INSERT INTO api.tracks (id, source_url, title, album_id, artist_id)
VALUES (1, 'https://www.wheeler.com/', 'Song One', 1, 1),
       (2, NULL, 'Song Two', 2, 2);

INSERT INTO api.chats (id, picture_url, title, update_time)
VALUES (1, 'https://www.lorempixel.com/300/635', 'show', '2025-01-15 07:39:52'),
       (2, 'https://www.lorempixel.com/676/966', 'health', NULL);

INSERT INTO api.posts (id, comments_count, description, likes_count, media_json, media_type, reposts_count, title,
                       views_count, user_id)
VALUES (1, 5, 'A cool post', 10, '{"image":"x.jpg"}', 5, 2, 'Title 1', 100, "abc123"),
       (2, 3, 'Another post', 20, '{"image":"y.jpg"}', 5, 4, 'Title 2', 200, "abc321");

INSERT INTO api.comments (id, text, post_id, user_id)
VALUES (1, 'Language ball floor meet usually board necessary. Natural sport music white.', 1, "abc123"),
       (2, 'Small citizen class morning. Others kind company likely.', 2, "abc321");

INSERT INTO api.hashtags (id, title)
VALUES (1, 'music'),
       (2, 'life');

INSERT INTO api.messages (id, content_json, content_type, sent_datetime, chat_id, user_id)
VALUES (1, '{"text":"hello"}', 1, '2025-03-02 06:05:29', 1, "abc123"),
       (2, '{"text":"hey"}', 1, '2025-03-17 08:17:28', 2, "abc321");

INSERT INTO api.posts_hashtags(post_id, hashtag_id)
VALUES (1, 1),
       (2, 2);

INSERT INTO api.tracks_listenings (listened_datetime, track_id, user_id)
VALUES ('2025-02-01 12:34:56', 1, "abc123"),
       ('2025-02-02 13:22:45', 2, "abc321");

INSERT INTO api.playlists (id, title, user_id)
VALUES (501, 'Morning Vibes', "abc123"),
       (502, 'Workout Hits', "abc321");

INSERT INTO api.tracks_playlists (track_id, playlist_id)
VALUES (1, 501),
       (2, 502);

INSERT INTO api.users_chats (user_id, chat_id)
VALUES ("abc123", 1),
       ("abc321", 2);

INSERT INTO api.users_followings (follower_user_id, followed_user_id)
VALUES ("abc123", "abc321"),
       ("abc321", "abc123");

INSERT INTO api.genres (id, title)
VALUES (10, 'Rock'),
       (11, 'Jazz');

INSERT INTO api.users_genres (user_id, genre_id)
VALUES ("abc123", 10),
       ("abc321", 11);

INSERT INTO api.vibes (id, title)
VALUES (1, 'Chill'),
       (2, 'Energetic');

INSERT INTO api.users_vibes (user_id, vibe_id)
VALUES ("abc123", 1),
       ("abc321", 2);
