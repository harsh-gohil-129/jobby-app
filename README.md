# Jobby App

A modern, user‑friendly job search platform built with React on the front end and a RESTful API back end. Jobby App makes finding and applying for your dream job simple and secure.

---

## 🔑 Login Credentials

Username: rahul
Password: rahul@2021

markdown
Copy
Edit

---

## 🚀 Features

### 🔒 Secure Authentication & Routing
- **Login Page** shows API error messages for invalid credentials.
- **Protected Routes:**  
  - Unauthenticated users trying to access **Home**, **Jobs**, or **Job Details** are redirected to **Login**.  
  - Authenticated users are prevented from revisiting **Login** and are routed to **Home** or **Jobs** as appropriate.

### 💼 Dynamic Job Listings & Filters
- **Profile First:** On **Jobs** page, your profile data is fetched first; a loader displays while fetching, and a retry button appears on failure.
- **Flexible Search & Filters:**  
  - Default fetch returns all jobs.  
  - Keyword search, multi-select employment types (e.g. `FULLTIME`, `PARTTIME`), and salary ranges (e.g. `₹10 LPA+`).  
  - Filters combine into one API request, e.g.:  
    ```
    employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search=engineer
    ```
- **Empty & Error States:**  
  - “No Jobs” view if no matches.  
  - Failure view with retry on API errors.

### 📄 Job Details & Similar Jobs
- **Details Page:** Clicking a job shows detailed info plus a list of similar jobs.
- **Loaders & Retry:** Loader while fetching, retry option on error.
- **External Links:** “Visit” button opens the company’s website in a new tab.

### 📌 Header & 404 Route
- **Header Navigation:** Logo, **Home**, and **Jobs** links navigate correctly.
- **Logout:** Clears authentication and returns to **Login**.
- **Custom 404 Page:** Any invalid URL shows a friendly “Page Not Found” view.

---

## 🛠️ Tech Stack

- **Front End:** React, React Router, JavaScript (ES6+), CSS  
- **Back End:** RESTful APIs, Node.js / Express (or your chosen backend)  
- **Authentication:** JWT (JSON Web Tokens)  
- **Data Fetching:** Fetch API / Axios  

---
