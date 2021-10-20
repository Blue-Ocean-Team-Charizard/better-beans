DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS shops;

DROP INDEX IF EXISTS photos_idx_reviews;
DROP INDEX IF EXISTS reviews_idx_users;
DROP INDEX IF EXISTS reviews_idx_shops;

CREATE TABLE reviews (
  id serial PRIMARY KEY,
  name varchar,
  body varchar,
  date timestamp,
  rating integer,
  helpful integer,
  reported integer,
  shop_id varchar,
  user_id varchar
);

CREATE TABLE photos (
  id serial PRIMARY KEY,
  review_id integer REFERENCES reviews(id),
  url varchar
);

CREATE TABLE visited (
  id serial PRIMARY KEY,
  user_id varchar,
  shop_id varchar,
  shop_name varchar,
  visited boolean
);

CREATE INDEX photos_idx_reviews ON photos USING hash (review_id);
CREATE INDEX reviews_idx_shops ON reviews USING hash (shop_id);
CREATE INDEX visited_idx_user_id ON visited USING hash (user_id);
