# Backend README.md

# Employee Management System Backend

Backend server for the MERN Mini Employee Management Application developed using Node.js, Express.js, MongoDB, and Mongoose.

This backend is responsible for:

* Handling employee-related API requests
* Performing CRUD operations
* Connecting with MongoDB database
* Managing employee records
* Sending JSON responses to frontend
* Handling server-side validation

---

# Backend Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* CORS
* dotenv
* Nodemon

---

# Backend Installation Guide

## Step 1: Navigate to backend folder

```bash
cd backend
```

---

## Step 2: Install dependencies

```bash
npm install
```

This installs:

* express
* mongoose
* cors
* dotenv
* nodemon

---

## Step 3: Create .env file

Inside backend folder create:

```env
PORT=5000
DB_URL=your_mongodb_connection_string
```

Example:

```env
PORT=5000
DB_URL=mongodb://127.0.0.1:27017/employeesdb
```

---

# Running the Backend Server

## Development mode

```bash
npm run dev
```

Nodemon automatically restarts server when changes are made.

---

## Production mode

```bash
npm start
```

---

# Backend Folder Structure

```bash
backend/
│
├── API/
│   └── Employeeapi.js            # Employee API routes
│
├── Model/
│   └── Employeemodel.js          # MongoDB employee schema
│
├── node_modules/                 # Installed dependencies
│
├── employee.http                 # API testing file
├── server.js                     # Main backend entry point
├── package.json                  # Project metadata and dependencies
├── package-lock.json             # Dependency lock file
└── .env                          # Environment variables
```

---

# Important Backend Files

## server.js

Main entry point of the backend application.

Responsibilities:

* Creates Express application
* Connects MongoDB database
* Enables middleware
* Registers API routes
* Starts backend server
* Handles incoming requests

Main setup flow:

```bash
Create Express App
        ↓
Connect MongoDB
        ↓
Enable Middleware
        ↓
Register APIs
        ↓
Start Server
```

Important middleware used:

```js
app.use(express.json())
app.use(cors())
```

Purpose:

* `express.json()` → Parses JSON request body
* `cors()` → Enables frontend-backend communication

---

## Model/Employeemodel.js

Defines MongoDB schema for employees.

Stores employee details such as:

* Employee name
* Salary
* Department
* Designation
* Email
* Age

Purpose:

* Defines structure of employee documents
* Performs MongoDB operations
* Adds validation rules

Example operations:

```js
Employee.find()
Employee.create()
Employee.findByIdAndUpdate()
Employee.findByIdAndDelete()
```

---

## API/Employeeapi.js

Contains all employee-related APIs.

This file handles CRUD operations.

CRUD Meaning:

| Operation | Meaning               |
| --------- | --------------------- |
| Create    | Add new employee      |
| Read      | Fetch employees       |
| Update    | Edit employee details |
| Delete    | Remove employee       |

---

# Main APIs

## Create Employee

```http
POST /employee-api/create
```

Purpose:

* Adds new employee to database

Request Body Example:

```json
{
  "name":"Rahul",
  "department":"IT",
  "salary":50000
}
```

---

## Get All Employees

```http
GET /employee-api/employees
```

Purpose:

* Fetches all employee records

---

## Get Employee By ID

```http
GET /employee-api/employees/:id
```

Purpose:

* Fetches specific employee details

---

## Update Employee

```http
PUT /employee-api/update/:id
```

Purpose:

* Updates employee information

---

## Delete Employee

```http
DELETE /employee-api/delete/:id
```

Purpose:

* Deletes employee from database

---

# Backend Request Flow

```bash
Frontend Request
        ↓
Express Route
        ↓
Controller/API Logic
        ↓
Mongoose Model
        ↓
MongoDB Database
        ↓
JSON Response
```

---

# Backend Features

* REST API Architecture
* CRUD Operations
* MongoDB Integration
* Express Routing
* Middleware Usage
* Error Handling
* JSON Data Handling
* API Testing Support

---

# Backend Commands Summary

## Install dependencies

```bash
npm install
```

## Run development server

```bash
npm run dev
```

## Run production server

```bash
npm start
```


# Backend Deployment on Render

## Step 1: Push Backend Code to GitHub

Commands:

```bash
git init
git add .
git commit -m "backend deployment"
git branch -M main
git remote add origin your_github_repo_link
git push -u origin main
```

---

## Step 2: Create Render Account

Visit:

```bash
https://render.com
```

Login using:

* GitHub
* Google
* Email

---

## Step 3: Create New Web Service

Inside Render:

```bash
Dashboard
    ↓
New +
    ↓
Web Service
```

Select your backend repository.

---

## Step 4: Configure Backend Deployment

Fill:

| Field          | Value            |
| -------------- | ---------------- |
| Name           | employee-backend |
| Root Directory | backend          |
| Runtime        | Node             |
| Build Command  | npm install      |
| Start Command  | npm start        |

---

## Step 5: Add Environment Variables

Inside Render → Environment Variables:

```env
PORT=5000
DB_URL=your_mongodb_connection_string
```

---

## Step 6: Deploy Backend

Click:

```bash
Create Web Service
```

Render generates backend URL:

Example:

```bash
https://employee-backend.onrender.com
```

---
---

# MongoDB Atlas Setup

## Step 1: Create MongoDB Atlas Account

Visit:

```bash
https://www.mongodb.com/atlas
```

---

## Step 2: Create Cluster

```bash
Create Cluster
      ↓
Choose Free Tier
      ↓
Create Database
```

---

## Step 3: Create Database User

Add:

* Username
* Password

---

## Step 4: Allow Network Access

Add:

```bash
0.0.0.0/0
```

Purpose:

Allows access from anywhere.

---

## Step 5: Get Connection String

Example:

```bash
mongodb+srv://username:password@cluster.mongodb.net/employeesdb
```

Use this string inside:

```env
DB_URL=
```

---

# Production Deployment Notes

## Important Backend Notes

* Enable CORS properly
* Add secure environment variables
* Never upload `.env` file to GitHub
* Use MongoDB Atlas for cloud database


# Common Deployment Errors

| Error                     | Solution               |
| ------------------------- | ---------------------- |
| CORS Error                | Enable cors middleware |
| API not working           | Check backend URL      |
| MongoDB connection failed | Verify DB_URL          |
| Build failed              | Install dependencies   |
| Blank screen              | Check VITE_API_URL     |

---
