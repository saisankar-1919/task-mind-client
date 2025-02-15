# Project Name

## Overview

Client a task management system that allows users to create, retrieve, update, and delete tasks. It is built using react.js wit material ui.

## Features

- User authentication and authorization
- Task creation, retrieval, update, and deletion
- Secure API with JWT authentication
- Data validation and error handling

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT Authentication
- Async/Await with error handling middleware

## Setup Instructions

### Prerequisites

- Node installed
- MongoDB installed and running locally or a MongoDB Atlas account

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/saisankar-1919/task-mind-client
   cd your-repo
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:

   ```env
   API_BASE_URL=<your_localhost_url>
   ```

4. Start the server:

   ```sh
   npm start
   ```

## API Documentation

### Authentication

#### Register User

**POST** `/api/auth/register`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "success message",
  "token": "auth_token",
  "user": {
    "id": "user_id",
    "email": "user_email"
  }
}
```

#### Login User

**POST** `/api/auth/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "success message",
  "data": {
    "token": "auth_token",
    "user": {
      "id": "user_id",
      "email": "user_email"
    }
  }
}
```

### Tasks

#### Get All Tasks

**GET** `/api/tasks`

**Headers:**

```json
{
  "Authorization": "jwt-token"
}
```

**Response:**

```json
[
  {
        "_id": "task_id",
        "title": "task title",
        "description": "task description",
        "completed": true/false,
        "user_id": "user_id",
        "__v": 0
    },
]
```

#### Create Task

**POST** `/api/tasks`

**Headers:**

```json
{
  "Authorization": "jwt-token"
}
```

**Request Body:**

```json
{
  "title": "New Task",
  "description": "Task description"
}
```

**Response:**

```json
{
  "_id": "taskId",
  "title": "New Task",
  "description": "Task description",
  "status": "pending",
  "createdAt": "2024-01-01T12:00:00.000Z"
}
```

#### Update Task

**PUT** `/api/tasks/:id`

**Headers:**

```json
{
  "Authorization": "jwt-token"
}
```

**Request Body:**

```json
{
  "status": "completed"
}
```

**Response:**

```json
{
  "_id": "taskId",
  "title": "New Task",
  "description": "Task description",
  "status": "completed",
  "updatedAt": "2024-01-01T13:00:00.000Z"
}
```

#### Delete Task

**DELETE** `/api/tasks/:id`

**Headers:**

```json
{
  "Authorization": "jwt-token"
}
```

**Response:**

```json
{
  "message": "Task deleted successfully"
}
```

## License

This project is licensed under the MIT License.
