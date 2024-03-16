# NestJS Bookmark Backend App

Welcome to the NestJS Bookmark Backend App! This application allows users to sign in and bookmark links for later reference.

## Description and Features

This backend application is built using NestJS on top of Express.js. It provides the following features:

-   **Authentication**: Utilizes JWT with Passport for authentication, ensuring secure access to user accounts and bookmarks.
-   **Database**: Powered by PostgreSQL, providing a robust and scalable storage solution for user data and bookmarks.
-   **ORM**: Utilizes Prisma as the ORM (Object-Relational Mapping) tool, simplifying database operations and ensuring data integrity.
-   **Containerization**: Docker is used for containerization, making it easy to deploy and run the application in various environments.
-   **API Testing**: SuperTest and Pactum are employed for API testing, ensuring the reliability and functionality of the endpoints.

## How to Run

To run the NestJS Bookmark Backend App, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine using the following command:

    ```bash
    git clone https://github.com/smh-kneonix/nestjs-bookmark-app.git
    ```

2. **go to directory**: cd into directory that project in that

    ```bash
    cd nestjs-bookmark-app
    ```

3. **config .env file**: create .env file and config by your own preference

    `HINT`: if you use docker compose to run database you can use this environment
    ```env
    DATABASE_URL="postgresql://postgres:123@localhost:5434/nest?schema=public"
    JWT_SECRET="yoursecret"
    ```

4. **install dependency**: install packages from npm

    `HINT`: make sure you have npm install on your machine

    ```bash
    npm install
    ```

5. **run database**: run postgres database

    `HINT`: make sure you have docker install on your machine

    ```bash
    npm run db:dev:start
    ```

6. **build and run the server**: run nest server and you good to go

    ```bash
    npm start
    ```

## API Documentation

For detailed documentation of the API endpoints and their usage, install insomnia and follow this command

```bash
npx insomnia-documenter --config insomniaDocument.json --output insomnia-final-result
cd insomnia-final-result
npx serve
```

## Running Tests

To run the tests for the NestJS Bookmark Backend App, follow these steps:

1. **Navigate to the Project Directory**: Open a terminal and navigate to the root directory of the project.

2. **Run Test Script**: Execute the following command to run the tests:

    ```bash
    npm run test:e2e
    ```