CREATE TABLE user
(id varchar(50) PRIMARY KEY,
username varchar(50) UNIQUE NOT NULL,
email varchar(50) UNIQUE NOT NULL,
password varchar(50) NOT NULL
);