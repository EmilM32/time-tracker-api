CREATE TABLE users (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL
);

CREATE TABLE projects (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  description text,
  user_id integer REFERENCES users(id)
);

CREATE TABLE tasks (
  id serial PRIMARY KEY,
  project_id integer REFERENCES projects(id),
  name varchar(255) NOT NULL,
  description text,
  start_time timestamp,
  end_time timestamp
);
