# Alexandria Tech Test

## Introduction

This is a Node.js application that connects to the GitHub API to perform various functionalities related to repositories. It provides endpoints to search, store, and favorite repositories. The application also utilizes a database to persist repository and favorite data.

### Tech Stack

Express.JS -> Prisma ORM -> PostgreSQL

## Installation

1. Clone the repository from the repository URL.
2. Create a `.env` file in the project root directory and set the required environment variables, can use this values:

   ```
   POSTGRES_USER=alexandria
   POSTGRES_PASSWORD=alexandria
   POSTGRES_DB=alexandria_db

   DATABASE_URL=postgresql://alexandria:alexandria@postgres:5432/alexandria_db?schema=public

   GITHUB_TOKEN=<OPTIONAL GitHub Access Token>

   IP_LOCATE_KEY=333131e3ea1baf016a1ee39deeab84fb
   This API KEY FROM https://www.iplocate.io/ to get ip timezone locations
   ```

3. Running with Docker
   Use Docker to run the application. Follow these steps:

   `docker compose up -d`

   The application will be running inside the Docker container and can be accessed at `http://localhost:3000`.

## API Routes

### GET /

- Description: Health check endpoint to verify the API is running.
- Request: `GET /`
- Response: Returns a JSON object with a success message.

### GET /search

- Description: Retrieves and saves top repositories for 5 different languages from the GitHub API.
- Request: `GET /search`
- Response: Returns a JSON array of the saved repositories.

### GET /repos

- Description: Retrieves all saved repositories.
- Request: `GET /repos`
- Response: Returns a JSON array of all saved repositories.

### PUT /repos/:id/favorite

- Description: Marks a repository as favorite or unfavorite, saving the timestamp and IP address used for the operation.
- Request: `PUT /repos/:id/favorite`
  - Body: JSON object with a `favorite` property indicating whether to favorite (`true`) or unfavorite (`false`) the repository.
- Response: Returns a success message.

### GET /favorites

- Description: Retrieves all favorited repositories, showing the timestamp in the user's timezone based on their IP location.
- Request: `GET /favorites`
- Response: Returns a JSON array of all favorited repositories with timestamps adjusted to the user's timezone.

## Error Handling

The API handles errors using middleware and returns appropriate error responses. Possible error responses include:

- 400 Bad Request: Invalid request or missing parameters.
- 404 Not Found: Resource not found.
- 500 Internal Server Error: Server-side error.

## Testing

Unit tests have been implemented using Jest and Docker enviroment for integration testing. To run the tests, execute the following command:

`npm run test`

The tests cover the main functionalities of the API and help ensure the correctness of the implementation.

## Dependencies

The Alexandria Teste use some of the following dependencies:

- Express: Web framework for handling API routes.
- Prisma: ORM (Object-Relational Mapping) for database operations.
- Octokit: Official GitHub REST API client for Node.js.
- Moment-timezone: Timezone support for Moment.js.
