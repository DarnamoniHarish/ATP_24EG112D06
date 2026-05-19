# Week 7 Assignments

This week focused on building a full-stack blog application using the MERN stack. The project includes both a backend server and a frontend user interface.

In the backend, we used Express and MongoDB with Mongoose to handle the data. We set up several APIs to manage different types of users like regular readers and authors. Authentication is handled using JWT tokens, which are stored in cookies to keep sessions secure. We also included error handling and database connection logic in the server setup.

On the frontend, we used React and Vite. The application has a routing system that handles different pages like the home page, login, and registration. We also implemented protected routes, so only authors can write or edit articles, while regular users can view their profiles and read posts.

Key things covered:
- Setting up a MERN stack project with a separate backend and frontend.
- Using Mongoose for database models (Users and Articles).
- Implementing role-based access control for Users and Authors.
- Building a responsive UI with React and handling state across the app.
- Connecting the frontend to the backend APIs for real-time data.
