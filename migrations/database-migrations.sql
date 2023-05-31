DROP TABLE IF EXISTS "timezones";
CREATE TABLE timezones (
    name VARCHAR(40) NOT NULL,
    country_code VARCHAR(2) NOT NULL,
    abbreviation VARCHAR(6) NOT NULL,
    time_start BIGINT NOT NULL,
    gmt_offset INT NOT NULL,
    dst VARCHAR(1) NOT NULL
);
