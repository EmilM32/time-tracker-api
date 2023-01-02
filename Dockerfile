FROM postgres:latest

# Set the environment variables from the environment file.
ENV POSTGRES_USER=$POSTGRES_USER
ENV POSTGRES_PASSWORD=$POSTGRES_PASSWORD
ENV POSTGRES_DB=$POSTGRES_DB

# Add a file with the necessary schema and data.
COPY schema.sql /docker-entrypoint-initdb.d/

# Expose the default PostgreSQL port.
EXPOSE 5432

# sudo docker run -p 5432:5432 --env-file .env postgres-db
