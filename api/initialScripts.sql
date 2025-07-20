drop database api;
create database api;

drop table messages;
drop table users_chats;
drop table chats;

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

delete from users_genres where user_id = "auth0|687d672250e5ce653980abaf";
delete from users_followings where follower_user_id = "auth0|687d672250e5ce653980abaf";
delete from playlists where user_id = "auth0|687d672250e5ce653980abaf";
delete from users where id = "auth0|687d672250e5ce653980abaf";

select *
from users;
select *
from chats;
select *
from messages;


INSERT INTO countries (name)
VALUES ('Afghanistan'),
       ('Albania'),
       ('Algeria'),
       ('Andorra'),
       ('Angola'),
       ('Antigua and Barbuda'),
       ('Argentina'),
       ('Armenia'),
       ('Australia'),
       ('Austria'),
       ('Azerbaijan'),
       ('Bahamas'),
       ('Bahrain'),
       ('Bangladesh'),
       ('Barbados'),
       ('Belarus'),
       ('Belgium'),
       ('Belize'),
       ('Benin'),
       ('Bhutan'),
       ('Bolivia'),
       ('Bosnia and Herzegovina'),
       ('Botswana'),
       ('Brazil'),
       ('Brunei'),
       ('Bulgaria'),
       ('Burkina Faso'),
       ('Burundi'),
       ('Cabo Verde'),
       ('Cambodia'),
       ('Cameroon'),
       ('Canada'),
       ('Central African Republic'),
       ('Chad'),
       ('Chile'),
       ('China'),
       ('Colombia'),
       ('Comoros'),
       ('Congo (Congo-Brazzaville)'),
       ('Costa Rica'),
       ('Croatia'),
       ('Cuba'),
       ('Cyprus'),
       ('Czech Republic'),
       ('Denmark'),
       ('Djibouti'),
       ('Dominica'),
       ('Dominican Republic'),
       ('Ecuador'),
       ('Egypt'),
       ('El Salvador'),
       ('Equatorial Guinea'),
       ('Eritrea'),
       ('Estonia'),
       ('Eswatini'),
       ('Ethiopia'),
       ('Fiji'),
       ('Finland'),
       ('France'),
       ('Gabon'),
       ('Gambia'),
       ('Georgia'),
       ('Germany'),
       ('Ghana'),
       ('Greece'),
       ('Grenada'),
       ('Guatemala'),
       ('Guinea'),
       ('Guinea-Bissau'),
       ('Guyana'),
       ('Haiti'),
       ('Honduras'),
       ('Hungary'),
       ('Iceland'),
       ('India'),
       ('Indonesia'),
       ('Iran'),
       ('Iraq'),
       ('Ireland'),
       ('Israel'),
       ('Italy'),
       ('Jamaica'),
       ('Japan'),
       ('Jordan'),
       ('Kazakhstan'),
       ('Kenya'),
       ('Kiribati'),
       ('Kuwait'),
       ('Kyrgyzstan'),
       ('Laos'),
       ('Latvia'),
       ('Lebanon'),
       ('Lesotho'),
       ('Liberia'),
       ('Libya'),
       ('Liechtenstein'),
       ('Lithuania'),
       ('Luxembourg'),
       ('Madagascar'),
       ('Malawi'),
       ('Malaysia'),
       ('Maldives'),
       ('Mali'),
       ('Malta'),
       ('Marshall Islands'),
       ('Mauritania'),
       ('Mauritius'),
       ('Mexico'),
       ('Micronesia'),
       ('Moldova'),
       ('Monaco'),
       ('Mongolia'),
       ('Montenegro'),
       ('Morocco'),
       ('Mozambique'),
       ('Myanmar'),
       ('Namibia'),
       ('Nauru'),
       ('Nepal'),
       ('Netherlands'),
       ('New Zealand'),
       ('Nicaragua'),
       ('Niger'),
       ('Nigeria'),
       ('North Korea'),
       ('North Macedonia'),
       ('Norway'),
       ('Oman'),
       ('Pakistan'),
       ('Palau'),
       ('Palestine'),
       ('Panama'),
       ('Papua New Guinea'),
       ('Paraguay'),
       ('Peru'),
       ('Philippines'),
       ('Poland'),
       ('Portugal'),
       ('Qatar'),
       ('Romania'),
       ('Russia'),
       ('Rwanda'),
       ('Saint Kitts and Nevis'),
       ('Saint Lucia'),
       ('Saint Vincent and the Grenadines'),
       ('Samoa'),
       ('San Marino'),
       ('Sao Tome and Principe'),
       ('Saudi Arabia'),
       ('Senegal'),
       ('Serbia'),
       ('Seychelles'),
       ('Sierra Leone'),
       ('Singapore'),
       ('Slovakia'),
       ('Slovenia'),
       ('Solomon Islands'),
       ('Somalia'),
       ('South Africa'),
       ('South Korea'),
       ('South Sudan'),
       ('Spain'),
       ('Sri Lanka'),
       ('Sudan'),
       ('Suriname'),
       ('Sweden'),
       ('Switzerland'),
       ('Syria'),
       ('Taiwan'),
       ('Tajikistan'),
       ('Tanzania'),
       ('Thailand'),
       ('Timor-Leste'),
       ('Togo'),
       ('Tonga'),
       ('Trinidad and Tobago'),
       ('Tunisia'),
       ('Turkey'),
       ('Turkmenistan'),
       ('Tuvalu'),
       ('Uganda'),
       ('Ukraine'),
       ('United Arab Emirates'),
       ('United Kingdom'),
       ('United States'),
       ('Uruguay'),
       ('Uzbekistan'),
       ('Vanuatu'),
       ('Vatican City'),
       ('Venezuela'),
       ('Vietnam'),
       ('Yemen'),
       ('Zambia'),
       ('Zimbabwe');

INSERT INTO genres (title)
VALUES ('Pop'),
       ('Rock'),
       ('Classical'),
       ('R&B'),
       ('Hip-Hop'),
       ('Jazz'),
       ('Electronic'),
       ('Indie');

INSERT INTO users (id, allow_messages, first_name, followers_count, followings_count, last_name, short_bio,
                   show_listening_history, ui_theme, username, country_id, day_track_id, goal_id)
VALUES ("abc123", 1, 'John', 10, 5, 'Doe', 'Loves coding', 1, 'dark', 'johndoe', 1, NULL, 1),
       ("abc321", 1, 'Jane', 15, 8, 'Smith', NULL, 1, 'light', 'janesmith', 2, NULL, NULL);

INSERT INTO artists (id, profile_bg_url, profile_quote, user_id)
VALUES (1, 'https://www.lorempixel.com/788/861', 'Whole magazine truth stop whose.', "abc123"),
       (2, 'https://dummyimage.com/733x447', 'Cause believe son would mouth.', "abc321");

INSERT INTO albums (id, title, artist_id)
VALUES (1, 'Greatest Hits', 1),
       (2, 'Acoustic Sessions', 2);

INSERT INTO tracks (id, source_url, title, album_id, artist_id)
VALUES (1, 'https://www.wheeler.com/', 'Song One', 1, 1),
       (2, NULL, 'Song Two', 2, 2);

INSERT INTO chats (id, picture_url, is_private, title, update_time)
VALUES (2, '', true, '', null);

INSERT INTO posts (id, comments_count, description, likes_count, media_json, media_type, reposts_count, title,
                   views_count, user_id)
VALUES (1, 5, 'A cool post', 10, '{"image":"x.jpg"}', 5, 2, 'Title 1', 100, "abc123"),
       (2, 3, 'Another post', 20, '{"image":"y.jpg"}', 5, 4, 'Title 2', 200, "abc321");

INSERT INTO comments (id, text, post_id, user_id)
VALUES (1, 'Language ball floor meet usually board necessary. Natural sport music white.', 1, "abc123"),
       (2, 'Small citizen class morning. Others kind company likely.', 2, "abc321");

INSERT INTO hashtags (id, title)
VALUES (1, 'music'),
       (2, 'life');

INSERT INTO messages (id, content_json, content_type, sent_datetime, chat_id, user_id)
VALUES (1, '{"text":"hello"}', 1, '2025-03-02 06:05:29', 1, "abc123"),
       (2, '{"text":"hey"}', 1, '2025-03-17 08:17:28', 2, "abc321");

INSERT INTO posts_hashtags(post_id, hashtag_id)
VALUES (1, 1),
       (2, 2);

INSERT INTO tracks_listenings (listened_datetime, track_id, user_id)
VALUES ('2025-02-01 12:34:56', 1, "abc123"),
       ('2025-02-02 13:22:45', 2, "abc321");

INSERT INTO playlists (id, title, user_id)
VALUES (501, 'Morning Vibes', "abc123"),
       (502, 'Workout Hits', "abc321");

INSERT INTO tracks_playlists (track_id, playlist_id)
VALUES (1, 501),
       (2, 502);

INSERT INTO users_chats (user_id, chat_id)
VALUES ("auth0|685da34feafd0587561b2ac9", 1),
       ("auth0|685d8d89dfd50588889a181d", 1);

INSERT INTO users_chats (user_id, chat_id)
VALUES ("auth0|6878fa50df17beee840c2bf6", 2),
       ("auth0|685da34feafd0587561b2ac9", 2);

INSERT INTO users_chats (user_id, chat_id)
VALUES ("auth0|68786d00fa9569c786c01278", 3),
       ("auth0|685d8d89dfd50588889a181d", 3),
       ("auth0|685da34feafd0587561b2ac9", 3);

INSERT INTO users_followings (follower_user_id, followed_user_id)
VALUES ("abc123", "abc321"),
       ("abc321", "abc123");

INSERT INTO users_genres (user_id, genre_id)
VALUES ("abc123", 10),
       ("abc321", 11);
