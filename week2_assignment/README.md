# MERN Stack Development - Week 2 Assignments

Welcome to the documentation for the Week 2 assignments of the MERN Stack ATP program. This week focused on strengthening JavaScript fundamentals and diving into backend development with Node.js and Express.

---

##  Day 3: Mastering Array Methods
Day 3 was all about learning how to manipulate data efficiently using modern JavaScript array methods. Instead of using old-fashioned loops, we used:

- **`filter()`**: To pick specific items from a list (e.g., finding products in stock).
- **`map()`**: To transform every item in a list (e.g., adding a bonus to salaries).
- **`reduce()`**: To calculate a single value from a list (e.g., finding the grand total of a cart).
- **`find()`**: To quickly locate a specific item.
- **`findIndex()`**: To find the position of an item in a list.

**Real-world scenarios covered:**
Shopping Cart Management
Student Grading System
Employee Payroll
Movie Database Filtering
Bank Transaction History

---

## Day 4: Modern JavaScript (ES6+) & Async JS
Day 4 introduced more advanced concepts that make JavaScript powerful and easier to write.

### Classes & Objects
We learned how to use **Classes** to create blueprints for objects, making our code more organized and reusable (e.g., a `Book` class for a library).

###  Spread & Rest Operators
- **Spread (`...`)**: Used to copy or merge arrays and objects easily.
- **Rest (`...`)**: Used in functions to handle any number of arguments.

###  Shallow vs. Deep Copy
We explored the difference between a quick copy (Shallow) and a complete independent copy (Deep) using `structuredClone()` to avoid accidental data changes.

### Asynchronous JavaScript
We leaned how to make code wait or run periodically using:
- **`setTimeout()`**: Running code after a delay (like evaluating exam results).
- **`setInterval()`**: Repeating code at intervals (like resending an OTP).

---

## Day 5: Backend with Express.js
Day 5 marked the start of building real servers! We used **Express.js** to create a **REST API** for managing products.

### Key Concepts Covered:
- **Routing**: Creating different "paths" for our application (e.g., `/products`, `/users`).
- **HTTP Methods (CRUD)**:
  - `GET`: Fetching data.
  - `POST`: Adding new data.
  - `PUT`: Updating existing data.
  - `DELETE`: Removing data.
- **Middleware**: Functions that run "in the middle" of a request to perform tasks like logging or security checks.
- **URL Parameters**: Using specific IDs in the URL (like `/products/101`) to find exactly what we need.

---

## Project Structure
- `day3ass*.js`: Array method exercises.
- `day4ass*.js`: ES6 classes, spread/rest, and timers.
- `day5ass1.js`: Express.js Product API.
- `server.js`: The main entry point for the backend server.
- `req.http`: A file to test all our API endpoints.
