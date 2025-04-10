# Student Job Tracker - Server

The server-side Node.js/Express application for the Student Job Tracker system.

## Overview

This is the backend portion of the Student Job Tracker application, built with Node.js, Express, and MongoDB. It provides the API and database services to store and manage job application data.

## Features

- RESTful API for job application CRUD operations
- MongoDB database integration
- Express middleware for request handling
- MVC architecture for clean separation of concerns

## Tech Stack

- Node.js
- Express.js
- MongoDB for data storage
- Mongoose ODM
- Express middleware for validation, error handling, etc.

## Project Structure

```
server/
├── config/
│   ├── db.js               # MongoDB connection setup
├── controllers/
│   ├── jobController.js    # Job application CRUD operations
├── models/
│   ├── Job.js              # Job application schema
├── routes/
│   ├── jobs.js             # API routes for job applications
├── server.js               # Express server setup
├── package.json
├── .env                    # Environment variables for backend
```

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. Clone the repository and navigate to the server directory
   ```
   cd student-job-tracker/server
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the server directory with the following:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```

4. Start the server
   ```
   npm run dev
   ```

5. The server should now be running at http://localhost:5000

## API Endpoints

### Jobs

- `GET /api/jobs` - Get all job applications
- `GET /api/jobs/:id` - Get a specific job application
- `POST /api/jobs` - Create a new job application
- `PUT /api/jobs/:id` - Update a job application
- `DELETE /api/jobs/:id` - Delete a job application

## Data Model

### Job Schema

```javascript
{
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied'
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'],
    default: 'Full-time'
  },
  location: {
    type: String
  },
  remote: {
    type: Boolean,
    default: false
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  link: {
    type: String
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

## Server Components

### server.js
The main entry point for the Express application. It sets up:
- Express middleware
- Database connection
- API routes
- Error handling

### config/db.js
Handles the MongoDB connection using Mongoose.

### models/Job.js
Defines the Mongoose schema for job applications.

### controllers/jobController.js
Contains the business logic for job-related operations:
- getJobs: Fetch all jobs, with optional filtering
- getJob: Fetch a single job by ID
- createJob: Add a new job application
- updateJob: Update an existing job
- deleteJob: Remove a job from the database

### routes/jobs.js
Defines the API routes and connects them to the controller functions.

## Available Scripts

- `npm start` - Starts the server in production mode
- `npm run dev` - Starts the server in development mode with nodemon for auto-reloading

## Error Handling

The server implements global error handling middleware to catch and process errors uniformly. API responses follow standard HTTP status codes:
- 200: Success
- 201: Resource created
- 400: Bad request
- 404: Resource not found
- 500: Server error

## Future Enhancements

- User authentication and authorization
- Rate limiting
- API documentation with Swagger
- Advanced query capabilities
- Database caching
- Logging system

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
