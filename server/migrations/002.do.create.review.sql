CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    films_id BIGINT NOT NULL REFERENCES films(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >=0 and rating <=5)

);
    