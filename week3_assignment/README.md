# Backend README.md

# Week 3 Backend Project

Backend server developed using Node.js, Express.js, and MongoDB.

This backend application is responsible for:

* Handling API requests
* Managing database operations
* Performing CRUD operations
* Connecting frontend with MongoDB
* Processing JSON data
* Managing routes and middleware
* Sending server responses

The backend follows REST API architecture and uses Express.js for routing and middleware handling.

---

# Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* dotenv
* cors
* nodemon

---

# Installation and Setup

## Step 1: Navigate to backend folder

```bash
cd backend
```

---

## Step 2: Install Dependencies

```bash
npm install
```

This installs all required backend packages.

Important packages:

| Package  | Purpose                        |
| -------- | ------------------------------ |
| express  | Backend framework              |
| mongoose | MongoDB connection             |
| cors     | Frontend-backend communication |
| dotenv   | Environment variables          |
| nodemon  | Auto server restart            |

---

## Step 3: Create .env File

Create a `.env` file inside backend folder.

Example:

```env
PORT=5000
DB_URL=your_mongodb_connection_string
```

Example MongoDB local URL:

```env
DB_URL=mongodb://127.0.0.1:27017/week3db
```

---

# Running the Backend Server

## Development Mode

```bash
npm run dev
```

Purpose:

* Starts server using nodemon
* Automatically restarts server when files change

---

## Production Mode

```bash
npm start
```

Purpose:

* Runs backend normally
* Used for deployment

---

# Backend Folder Structure

```bash
backend/
│
├── APIs/                         # API route handlers
│   ├── UserAPI.js                # User-related APIs
│   ├── ProductAPI.js             # Product-related APIs
│   └── AdminAPI.js               # Admin-related APIs
│
├── models/                       # MongoDB schemas/models
│   ├── UserModel.js              # User schema
│   └── ProductModel.js           # Product schema
│
├── middlewares/                  # Custom middleware
│   └── ErrorHandler.js           # Error handling middleware
│
├── config/                       # Configuration files
│   └── db.js                     # MongoDB connection setup
│
├── node_modules/                 # Installed dependencies
│
├── server.js                     # Main server file
├── package.json                  # Project metadata
├── package-lock.json             # Dependency lock file
└── .env                          # Environment variables
```

---

# Important Backend Files

## server.js

This is the main entry point of the backend.

Responsibilities:

1. Creates Express application
2. Connects MongoDB database
3. Enables middleware
4. Registers APIs
5. Handles requests
6. Starts server
7. Handles errors globally

Main backend flow:

```bash
Frontend Request
        ↓
Express Server
        ↓
Middleware
        ↓
API Routes
        ↓
MongoDB Queries
        ↓
Response Sent Back
```

Important middleware:

```js
app.use(express.json())
app.use(cors())
```

Purpose:

* `express.json()` parses JSON request data
* `cors()` enables frontend-backend communication

Example route registration:

```js
app.use('/user-api', userApp)
app.use('/product-api', productApp)
```

---

## config/db.js

Handles MongoDB database connection.

Responsibilities:

* Connects MongoDB using Mongoose
* Verifies successful connection
* Handles database connection errors

Example:

```js
mongoose.connect(process.env.DB_URL)
```

---

# Models Explanation

## models/UserModel.js

Defines MongoDB schema for users.

Stores:

* Username
* Email
* Password
* Role
* Mobile number

Purpose:

* User data management
* Authentication support
* Database validation

Common operations:

```js
User.find()
User.create()
User.findById()
```

---

## models/ProductModel.js

Defines product schema.

Stores:

* Product name
* Price
* Category
* Quantity
* Description

Purpose:

* Product management
* Product CRUD operations
* Database structure definition

---

# API Files Explanation

## APIs/UserAPI.js

Handles user-related routes.

Main APIs:

### Register User

```http
POST /user-api/register
```

Purpose:

* Creates new user
* Stores user in database

---

### Login User

```http
POST /user-api/login
```

Purpose:

* Validates credentials
* Authenticates user

---

### Get Users

```http
GET /user-api/users
```

Purpose:

* Fetches all users

---

## APIs/ProductAPI.js

Handles product-related operations.

Main APIs:

### Create Product

```http
POST /product-api/create
```

Purpose:

* Adds new product

---

### Get Products

```http
GET /product-api/products
```

Purpose:

* Fetches all products

---

### Update Product

```http
PUT /product-api/update/:id
```

Purpose:

* Updates product details

---

### Delete Product

```http
DELETE /product-api/delete/:id
```

Purpose:

* Removes product from database

---

## APIs/AdminAPI.js

Handles admin-related functionality.

Responsibilities:

* Manage users
* Manage products
* Perform administrative operations

---

# Middleware Explanation

## middlewares/ErrorHandler.js

Custom error handling middleware.

Purpose:

* Handles server errors
* Sends proper error responses
* Prevents server crashes

Example:

```js
app.use(errorHandler)
```

---

# CRUD Operations Flow

```bash
Create → POST
Read   → GET
Update → PUT
Delete → DELETE
```

---

# Backend Features

* REST API Architecture
* MongoDB Integration
* CRUD Operations
* Middleware Usage
* Error Handling
* Environment Variables
* JSON Data Processing
* Express Routing

---

# Common Backend Commands

## Install Dependencies

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

## Run Production Server

```bash
npm start
```

---

# Environment Variables

```env
PORT=
DB_URL=
```

---

# Deployment on Render

## Step 1: Push Project to GitHub

```bash
git init
git add .
git commit -m "backend deployment"
git branch -M main
git remote add origin your_repo_link
git push -u origin main
```

---

## Step 2: Create Render Account

Visit:

```bash
https://render.com
```

Login using GitHub.

---

## Step 3: Create Web Service

Inside Render:

```bash
New +
   ↓
Web Service
```

Select backend repository.

---

## Step 4: Configure Deployment

| Field          | Value       |
| -------------- | ----------- |
| Runtime        | Node        |
| Build Command  | npm install |
| Start Command  | npm start   |
| Root Directory | backend     |

---

## Step 5: Add Environment Variables

```env
PORT=5000
DB_URL=your_mongodb_connection_string
```

---

## Step 6: Deploy

Click:

```bash
Create Web Service
```

Render generates deployment URL.

Example:

```bash
https://week3-backend.onrender.com
```

---

# MongoDB Atlas Setup

## Create MongoDB Atlas Account

Visit:

```bash
https://www.mongodb.com/atlas
```

---

## Create Cluster

```bash
Create Cluster
      ↓
Choose Free Tier
```

---

## Create Database User

Add:

* Username
* Password

---

## Allow Network Access

```bash
0.0.0.0/0
```

Purpose:

* Allows global access

---

## Get Connection String

Example:

```bash
mongodb+srv://username:password@cluster.mongodb.net/week3db
```

Use inside:

```env
DB_URL=
```

---

# Common Deployment Errors

| Error                     | Solution                    |
| ------------------------- | --------------------------- |
| MongoDB connection failed | Verify DB_URL               |
| Build failed              | Install dependencies        |
| CORS Error                | Enable cors middleware      |
| API not working           | Verify routes               |
| Server crash              | Check environment variables |

---

# Author

Developed using:

* Node.js
* Express.js
* MongoDB
* Mongoose
