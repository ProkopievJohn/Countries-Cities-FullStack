CREATE DATABASE IF NOT EXISTS countries_cities_database;

CREATE TABLE countries (
	country_id NUMERIC( 3 ) PRIMARY KEY,
	country VARCHAR( 64 ) NOT NULL
);

CREATE TABLE continents (
	continent_id NUMERIC( 3 ) PRIMARY KEY,
	continent VARCHAR( 64 ) NOT NULL
);

CREATE TABLE tell_code (
	tell_code_id NUMERIC( 4 ) PRIMARY KEY,
	tell_code NUMERIC( 15 ) NOT NULL,
	country_id NUMERIC( 3 ) NOT NULL
);

CREATE TABLE countries_data (
	_id NUMERIC( 1 ) PRIMARY KEY,
	country NUMERIC( 3 ) NOT NULL,
	city VARCHAR( 64 ) NOT NULL,
	continent NUMERIC( 3 ) NOT NULL
);


INSERT INTO continents VALUES
	( 201, 'North America' ),
	( 202, 'Europe' );

INSERT INTO countries VALUES
	( 101, 'Canada' ),
	( 102, 'Denmark' ),
	( 103, 'Norway' );

INSERT INTO tell_code VALUES
	( 1001, 1, 101 ),
	( 1002, 47, 103 ),
	( 1003, 4779, 103 );

INSERT INTO countries_data VALUES
	( 1, 101, 'Toronto', 201 ),
	( 2, 101, 'Vancouver', 201 ),
	( 3, 102, 'Copenhagen', 202 ),
	( 4, 102, 'Bronshoj', 202 ),
	( 5, 103, 'Oslo', 203 ),
	( 6, 103, 'Drammen', 203 );

SELECT countries.country, countries_data.city, tell_code.tell_code
	FROM countries, countries_data, tell_code
	WHERE countries.country_id=countries_data.country
		AND countries.country_id=101
		AND countries.country_id=tell_code.country_id;

-- 4babe0517884c14c72ebb063202a5f8187958a0e
