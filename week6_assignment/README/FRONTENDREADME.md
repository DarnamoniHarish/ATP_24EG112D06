# Employee Management System Frontend

Frontend application for the MERN Mini Employee Management System developed using React and Vite.

This frontend provides:

* Employee listing page
* Employee creation form
* Employee editing form
* Navigation system
* API integration with backend
* State management
* Responsive user interface

The frontend communicates with backend APIs using Axios/fetch requests.

---

# Frontend Technologies Used

* React.js
* Vite
* React Router DOM
* Context API
* Zustand
* CSS

---

# Frontend Installation Guide

## Step 1: Navigate to frontend folder

```bash
cd frontend/vite-project
```

---

## Step 2: Install dependencies

```bash
npm install
```

---

## Step 3: Create environment file

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

---

# Running Frontend

## Start development server

```bash
npm run dev
```

---

## Build project

```bash
npm run build
```

---

## Preview production build

```bash
npm run preview
```

---

# Frontend Folder Structure

```bash
frontend/vite-project/
│
├── src/
│   │
│   ├── assets/                     # Images and static assets
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/                 # React components
│   │   ├── CreateEmp.jsx
│   │   ├── EditEmployee.jsx
│   │   ├── Employee.jsx
│   │   ├── Header.jsx
│   │   ├── Home.jsx
│   │   ├── ListofEmp.jsx
│   │   └── RootLayout.jsx
│   │
│   ├── contexts/                   # React Context API files
│   │   ├── Context1.jsx
│   │   └── ContextProvider.jsx
│   │
│   ├── stores/                     # Zustand stores
│   │   ├── CounterStore.js
│   │   └── test.js
│   │
│   ├── App.jsx                     # Main routing component
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles
│
├── public/
├── package.json
├── vite.config.js
└── .env
```

---

# Important Frontend Files

## src/main.jsx

Entry point of React application.

Responsibilities:

* Connects React with browser DOM
* Loads App component
* Renders application

Main flow:

```bash
main.jsx
    ↓
App.jsx
    ↓
Components
    ↓
UI Rendered
```

---

## src/App.jsx

Main routing component.

Responsibilities:

* Defines all routes
* Controls navigation
* Connects all pages
* Manages component rendering

Example:

```jsx
<Route path='/' element={<Home />} />
<Route path='/employees' element={<ListofEmp />} />
```

---

## src/components/CreateEmp.jsx

Component used to create new employees.

Features:

* Employee form
* Input validation
* API submission
* Data handling

Flow:

```bash
Fill Form
    ↓
Submit Data
    ↓
API Request
    ↓
Backend Stores Data
```

---

## src/components/EditEmployee.jsx

Used to edit employee details.

Features:

* Fetch existing employee data
* Update form values
* Submit updated information

---

## src/components/ListofEmp.jsx

Displays all employee records.

Features:

* Fetch employee data
* Display employee cards/table
* Update UI dynamically

---

## src/components/Employee.jsx

Represents single employee information.

Displays:

* Name
* Department
* Salary
* Employee details

---

## src/components/Header.jsx

Navigation component.

Contains:

* Navigation links
* Branding/title
* Route navigation

---

## src/components/Home.jsx

Landing page component.

Purpose:

* Displays welcome page
* Provides navigation access

---

## src/components/RootLayout.jsx

Main layout wrapper.

Responsibilities:

* Shared layout structure
* Common UI rendering
* Nested route rendering

---

# Context API Files

## contexts/ContextProvider.jsx

Provides global state using Context API.

Purpose:

* Shares data between components
* Avoids prop drilling
* Centralizes state management

---

## contexts/Context1.jsx

Creates React Context object.

Used with:

```js
createContext()
```

---

# Zustand Store Files

## stores/CounterStore.js

Example Zustand state management store.

Purpose:

* Manages shared state globally
* Provides lightweight state handling

---

# Frontend Features

## Employee CRUD Operations

Supports:

* Add Employee
* View Employees
* Edit Employee
* Delete Employee

---

## React Routing

Uses React Router for navigation.

Example routes:

| Route      | Component    |
| ---------- | ------------ |
| /          | Home         |
| /employees | ListofEmp    |
| /create    | CreateEmp    |
| /edit/:id  | EditEmployee |

---

## API Integration

Frontend sends requests to backend APIs.

Operations include:

* Fetch data
* Send form data
* Update records
* Delete records

---

## State Management

Uses:

* Context API
* Zustand

Purpose:

* Global state sharing
* Efficient updates

---

## Responsive UI

Application works on:

* Desktop
* Tablet
* Mobile devices

---

# Complete MERN Project Flow

```bash
React Frontend
        ↓
API Request
        ↓
Express Backend
        ↓
Mongoose Model
        ↓
MongoDB Database
        ↓
Response Returned
        ↓
Frontend UI Updated
```

---

# Common Frontend Commands

## Install dependencies

```bash
npm install
```

## Run frontend

```bash
npm run dev
```

## Build frontend

```bash
npm run build
```

## Preview build

```bash
npm run preview
```

---

# Complete Deployment Guide

# Frontend Deployment on Vercel

## Step 1: Push Frontend Code to GitHub

Commands:

```bash
git add .
git commit -m "frontend deployment"
git push
```

---

## Step 2: Create Vercel Account

Visit:

```bash
https://vercel.com
```

Login using GitHub.

---

## Step 3: Import Frontend Repository

Inside Vercel:

```bash
Add New Project
       ↓
Import Git Repository
```

Select frontend repository.

---

## Step 4: Configure Frontend Deployment

Fill:

| Field            | Value                 |
| ---------------- | --------------------- |
| Framework Preset | Vite                  |
| Root Directory   | frontend/vite-project |
| Build Command    | npm run build         |
| Output Directory | dist                  |

---

## Step 5: Add Environment Variables

Add:

```env
VITE_API_URL=https://employee-backend.onrender.com
```

This connects frontend with deployed backend.

---

## Step 6: Deploy Frontend

Click:

```bash
Deploy
```

Vercel generates frontend URL.

Example:

```bash
https://employee-management.vercel.app
```

---

# Deployment Flow

```bash
React Frontend (Vercel)
            ↓
Axios API Requests
            ↓
Render Backend APIs
            ↓
MongoDB Atlas Database
            ↓
Response Returned
            ↓
Frontend Updated
```

---

## Important Frontend Notes

* Always use deployed backend URL
* Update `VITE_API_URL`
* Build project before deployment

---

# Author

Developed as a MERN Stack Mini Employee Management System using:

* React.js
* Node.js
* Express.js
* MongoDB

Developed as a MERN Stack Mini Employee Management System using:

* React.js
* Node.js
* Express.js
* MongoDB
