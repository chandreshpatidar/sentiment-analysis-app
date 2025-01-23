# Sentiment Analysis App

This is a sentiment analysis application that allows users to analyze the sentiment of a given text.

## Features

- **Login**: Secure login for users and admins with `username` and `password` authentication.
- **End User Feedback Submission**: Allows end users to submit feedback.
- **Admin View Submitted Feedback**: Admins can view all submitted feedback with pagination support (Through Infinite Scrolling).

## Prerequisites

Before you start, make sure you have the following installed:

- **Node.js** (version 20 or higher)  
  [Download Node.js](https://nodejs.org/)

## Installation

Follow these steps to get the Sentiment App up and running locally:

1. Install dependencies using pnpm:

   ```bash
   pnpm install
   ```

2. Add environment variables:

    Create `.env` file in root directory and paste environment vaiables from `.env.example` file or from below and update the value

    ```bash
    NEXT_PUBLIC_COOKIE_DOMAIN="localhost"
    NEXT_PUBLIC_API_BASE_URL="http://localhost:8000/api"
    ```

3. Run the development server:

   ```bash
   pnpm dev
   ```

   The application will be running at [http://localhost:3000](http://localhost:3000).

## Folder Structure

This is a folder structure for the Sentiment App (Frontend):

```
/sentiment-analysis-app/client
│
├── /app                  # Contains route-based components
│   ├── layout.tsx        # Application Layout file
│   ├── page.tsx          # Application `/` page file
│
├── /components           # Reusable components
│
├── /config               # Configuration related stuff
│
├── /hooks                # Shared hooks
│
├── /modules              # Contains individual module
│
├── /public               # Static assets (images, icons, etc.)
│
├── /utils                # Utility functions or shared code
│
├── middleware.ts         # Next.js middleware file
└── next.config.ts        # Next.js configuration file

```

## Limitations

- **List Virtualization**: In the feedback table, I've implemented infinite scrolling pagination. However, all feedback items are currently being rendered in the DOM, which can significantly increase the number of elements for large datasets. To optimize performance, we can implement list virtualization.
