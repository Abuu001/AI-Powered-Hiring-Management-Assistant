CREATE DATABASE  HiringManagementSystem;

-- To install the uuid-ossp module 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id uuid PRIMARY KEY  DEFAULT uuid_generate_v4(),
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(50) NOT NULL,
    user_password VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT Now() 
);

-- alter table
ALTER TABLE users 
    ALTER  COLUMN user_password  TYPE VARCHAR(200);

INSERT INTO users (user_name,user_email,user_password) VALUES('Janel','janel34@gmail.com','miami892');

--expanded display --  \x on

CREATE TABLE persondetails(
    id BIGSERIAL PRIMARY KEY ,
    firstname VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    dob DATE NOT NULL ,
    age INT CHECK(age>=1 ) NOT NULL,
    idno INT CHECK(idno > 00567731),
    certno INT CHECK(certno > 1000) NOT NULL
);

INSERT INTO persondetails(firstname,surname,dob,age,idno,certno) VALUES('abu','jim','2020-01-03',21,32294124,34342);

CREATE TABLE censustally(
    id BIGSERIAL PRIMARY KEY ,
    q1 INT CHECK(q1<=30),
    q2 VARCHAR(30),
    q3 INT CHECK(q1<=30),
    q4 INT CHECK(q1<=30),
    q5 VARCHAR(30),
    q6 VARCHAR(10),
    q7 VARCHAR(7),
    q8 INT CHECK(q1<=30)
);
