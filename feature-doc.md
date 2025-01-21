# Sentiment Analysis API Features

## Overview

This project implements a sentiment analysis system integrated with an Express.js application, TypeORM, and PostgreSQL. It provides two REST APIs:

1. **Post feedback and analyze Sentiment**: Accepts a text input, calculates its sentiment, associates it with a user, and stores the result in the database.
2. **Fetch Sentiments**: Retrieves saved sentiments with user details, supporting cursor-based pagination.

## Database Schema

### **User Table** (Existing)

| Column         | Type    | Description                      |
| -------------- | ------- | -------------------------------- |
| id             | Integer | Primary key.                     |
| name           | String  | User’s name.                     |
| hashedPassword | String  | Encrypted password               |
| role           | String  | Role of the user (admin / user). |

### **Sentiment Table**

| Column    | Type      | Description                               |
| --------- | --------- | ----------------------------------------- |
| id        | Integer   | Primary key.                              |
| text      | String    | Customer input text (max 1000 chars).     |
| score     | Float     | Sentiment polarity score.                 |
| magnitude | Float     | Sentiment strength.                       |
| sentiment | String    | Categorized sentiment (Good/Bad/Neutral). |
| user_id   | Integer   | Foreign key linking to the User table.    |
| createdAt | Timestamp | Auto-generated creation time.             |

## Additional implementation

- Fixed auth.middleware to attach user to req object
- Use auth.middlewware for all feedback routes
- Dockerize application, additionally docker-compose supports auto-restart on file changes.