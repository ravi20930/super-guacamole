# Candidate Skill Rating API

This is a RESTful API built with TypeScript, Sequelize, and PostgreSQL. The API allows you to manage users (candidates and reviewers), create candidate responses, rate candidate responses, and retrieve aggregated skill ratings for candidates.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up the database and update the configuration in `src/config/config.ts`
4. Run the application: `npm start`

## Routes

### User Routes

#### `POST /api/users`

Create a new user.

**Payload**:

```json
{
  "name": "John Doe",
  "role": "candidate"
}
```

#### `GET /api/users`

Get a list of all users.

#### `GET /api/users/:id`

Get a user by ID.

#### `PUT /api/users/:id`

Update a user's information.

**Payload**:

```json
{
  "name": "John Doe",
  "role": "reviewer"
}
```

#### `DELETE /api/users/:id`

Delete a user by ID.

### Candidate Routes

#### `POST /api/candidate-responses`

Create a new candidate response.

**Payload**:

```json
{
  "userId": 1,
  "skillId": 1,
  "difficultyLevel": "easy",
  "question": "What is Node.js?",
  "response": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."
}
```

#### `GET /api/candidate-responses/:userId`

Get a list of candidate responses for a specific user.

#### `PUT /api/candidate-responses/:id/rate`

Rate a candidate's response.

**Payload**:

```json
{
  "rating": 4
}
```

#### `GET /api/candidate-responses/:userId/rating`

Get the aggregated skill rating for a specific user.

### Authentication Routes

You'll need to implement the authentication routes based on the library or method you choose.

## Payload Explanations

### User Payload

- `name` (string): The name of the user.
- `role` (string): The role of the user, either 'candidate' or 'reviewer'.

### Candidate Response Payload

- `userId` (number): The ID of the user (candidate) who provided the response.
- `skillId` (number): The ID of the skill being evaluated.
- `difficultyLevel` (string): The difficulty level of the question, either 'easy', 'medium', or 'hard'.
- `question` (string): The question asked to the candidate.
- `response` (string): The candidate's response to the question.
- `rating` (number, optional): The rating given by the reviewer for the candidate's response.

## Database Schema

The application uses two main tables:

1. `users`:

   - `id` (integer, primary key)
   - `name` (string)
   - `role` (enum: 'candidate', 'reviewer')

2. `candidateResponses`:
   - `id` (integer, primary key)
   - `userId` (integer, foreign key referencing `users.id`)
   - `skillId` (integer)
   - `difficultyLevel` (enum: 'easy', 'medium', 'hard')
   - `question` (text)
   - `response` (text)
   - `rating` (integer, nullable)

## Aggregated Skill Rating Calculation

The formula for calculating the aggregated skill rating is as follows:

```
(1 * easy_number_of_questions_rated * rating) + (2 * medium_number_of_questions_rated * rating) + (3 * hard_number_of_questions_rated * rating)
------------------------------------------------------------------------------------------------------------------------------------------------------------
            (1 * easy_number_of_questions) + (2 * medium_number_of_questions) + (3 * hard_number_of_questions)
```

Where:

- `easy_number_of_questions_rated` is the number of 'easy' questions rated by the reviewer.
- `medium_number_of_questions_rated` is the number of 'medium' questions rated by the reviewer.
- `hard_number_of_questions_rated` is the number of 'hard' questions rated by the reviewer.
- `rating` is the rating given by the reviewer for each question.
- `easy_number_of_questions`, `medium_number_of_questions`, and `hard_number_of_questions` are the total number of questions for each difficulty level.

## Example

Suppose a candidate has the following responses:

```json
[
  {
    "skillId": 1,
    "difficultyLevel": "easy",
    "question": "What is Node.js?",
    "rating": 5,
    "response": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."
  },
  {
    "skillId": 1,
    "difficultyLevel": "easy",
    "question": "What is Express.js?",
    "rating": 5,
    "response": "Express.js is a web application framework for Node.js."
  },
  {
    "skillId": 1,
    "difficultyLevel": "hard",
    "question": "How to handle child processes in Node.js?",
    "rating": 4,
    "response": "..."
  },
  {
    "skillId": 1,
    "difficultyLevel": "medium",
    "question": "What are streams in Node.js?",
    "rating": 4,
    "response": "..."
  }
]
```

The aggregated skill rating for `skillId` 1 would be:

```
(1 * 5 * 2 + 2 * 4 * 1 + 3 * 4 * 1) / (1 * 2 + 2 * 1 + 3 * 1) = 4.3
```

So, the output would be:

```json
[
  {
    "skillId": 1,
    "rating": 4.3
  }
]
```
