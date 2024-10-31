# Reddit Nested Comment Clone
This project is a Reddit-like nested comment system designed to demonstrate frontend skills using React and other web technologies. It is a full-stack application with a Fastify-based backend built in Node.js, a frontend in React, and a PostgreSQL database managed with Prisma ORM. Docker is used to containerize the application for easy deployment.

## Features
* Nested commenting system similar to Reddit
* Full-stack project with both frontend and backend
* Backend server built with Fastify and Node.js
* Frontend built with React
* PostgreSQL database managed with Prisma ORM
* Seed data to initialize the database
* Containerized using Docker for easy setup and deployment

## Installation

### Prerequisites
 * Docker installed on your machine
 * Prisma CLI installed globally (optional)
### Setting up the Project
1. Clone the Repository
 ```bash
git clone https://github.com/AmilaBandara1994/reddit-comment-clone.git
cd reddit-comment-clone
 ```
2. Start The Database Use Docker to spin up a PostgreSQL database
 ```bash
 docker compose up
 ```
3. Install Dependencies Navigate to both the client and server folders, then run the following command to install all necessary packages:
 First run the 
 ```bash
 npm install
 ```
4. Set Up Prisma and Seed the Database In the backend directory, initialize Prisma and seed the database:
 ```bash
npx prisma migrate dev --name init
npx prisma db seed
 ```

 5. Run the Application After everything is set up, start both the backend and frontend servers.
 #### server
 ```bash
npm run dev
 ```
  #### client
 ```bash
npm start
 ```
### Database Seeding
The seed file populates the database with initial data. This file is located in prisma/seed.js (or .ts if using TypeScript). You can modify this file to include data relevant to your needs.