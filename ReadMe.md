# Home Assignment: Sentiment Analysis Application

## Requirements

Please read [Requirements.md](./Requirements.md)

## Setup Instructions

1. **Cloud NLP Setup**
   - Create a Google Cloud Project
   - Enable [Cloud Netural Language API](https://console.cloud.google.com/marketplace/product/google/language.googleapis.com?q=search&hl=en)
   - Associate credentials and generate a service account key file
   - Download service account key file at `~/local/service-accounts/path.json`

2. **Run Dev Server**
   - Update Service account key path in `docker-compose` file
   
      <span style="color: red;">~/Documents/service-accounts:/service-accounts</span>

      <span style="color: green;">~/local/service-accounts:/service-accounts</span>
   - Run command
      ```bash 
      docker-compose up
      ```
   - Server should be available at http://localhost:8000/

## Requirements

   - Implement a REST API, which takes text (up to 1000 characters) as input, calculates a sentiment of the text, and stores the results in a database.

   - Implement a REST API, which returns saved customer text messages together with calculated sentiments.

   - Implement a frontend application with a feedback form for the end customer and that displays existing feedback with sentiment to ADMIN users.

   - Tech stacks:
        - **Frontend:** React or Nextjs, tailwindcss or chakraUI
        - **Backend:** Nodejs, express, PostgreSQL

## Instructions

   - Design, implement, and test your solution.

   - Prepare a short, concise document (no presentation slides, 2 pages max) describing your solution (design, architecture, database structure if applicable).

   - Send us the document and your implementation in a ZIP file (please, exclude binaries and dependencies)

   - Your assignment is complete when you have a working solution that you can show to your customer.

## Advice/Hints

   - Since we already provide project backend infrastructure that contains user authentication and authorization, you should keep our codebase style and structure for this project.

   - Consider using existing libraries or cloud services for calculating sentiment.

   - Think of sentiment as simple classification (Good/Bad/Neutral).

   - Target for simplicity. Don't overcommit to the task, we value your personal time.

   - If you have any questions, don't hesitate to ask.

   - If you manage to complete the task very fast, here are a couple of bonus tasks:

        - Integrate with blockchain as connecting with metamask using web3.js.

        - Deploy your solution to the cloud.

        - Implement engineering best practices (source control, CI/CD, infrastructure-as-a-code)
