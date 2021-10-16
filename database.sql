DROP DATABASE IF EXISTS betterbeans;
CREATE DATABASE betterbeans

CREATE TABLE shops (
  id serial,
  google_id varchar,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id serial,
  name varchar,
  email varchar,
  photo_url varchar,
  PRIMARY KEY (id)
);

CREATE TABLE reviews (
  id serial,
  first_name varchar,
  title varchar,
  body varchar,
  rating integer,
  helpful integer,
  reported integer,
  shop_id varchar,
  user_id integer,
  date timestamp,
  PRIMARY KEY (id),
  CONSTRAINT FK_reviews.user_id
    FOREIGN KEY (user_id)
      REFERENCES users(id),
  CONSTRAINT FK_reviews.shop_id
    FOREIGN KEY (shop_id)
      REFERENCES shops(id)
);

CREATE TABLE photos (
  id serial,
  review_id integer,
  url varchar,
  PRIMARY KEY (id),
  CONSTRAINT FK_photos.review_id
    FOREIGN KEY (review_id)
      REFERENCES reviews(id)
);



CREATE INDEX photos_idx_reviews ON photos USING hash (review_id);
CREATE INDEX reviews_idx_shops ON reviews USING hash (shop_id);
CREATE INDEX reviews_idx_users ON reviews USING hash (user_id);