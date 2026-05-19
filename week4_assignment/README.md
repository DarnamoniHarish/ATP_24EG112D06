# Week 4 Assignments

This folder contains the work I did for week 4. It covers some basic HTML practice and the initial backend setup for the capstone project.

### HTML Exercises
I worked on two simple HTML files to get comfortable with page structure. The first one is just about using basic tags like headings, paragraphs, and simple lists to organize content. The second one goes a bit further into nested lists, which is great for showing how to group related items under different categories.

### Capstone Backend
The main focus this week was building the backend for the capstone project. I used Node.js and Express for the server and Mongoose to connect to the MongoDB database.

Here is a breakdown of what I implemented:
- I set up the main server file to handle the database connection and the port settings.
- I created separate API routes for different roles like Admin, Author, and regular Users. This makes the project much easier to manage as it grows.
- I built a login and registration system. It uses JWT tokens and cookies to handle authentication securely.
- I created database models for Users and Articles to define how the data should be structured in MongoDB.
- I added middleware to handle things like checking if a user is logged in and catching errors so the server provides useful feedback when something goes wrong.
- I also included several .http files that I used to test the endpoints and make sure the registration, login, and article management work correctly.

Overall, this week was about moving from simple static HTML to building a functional and secure server that can handle different types of users and data.
