# Student Assessment Platform

## Overview
The Student Assessment Platform is a web-based application designed to assist lecturers in teaching programming languages to students. The system analyzes students' performance throughout the semester, distinguishing between excelling and at-risk students. It provides an interactive coding environment (IDE) where students can practice coding, complete challenges, and receive immediate assessment. 

This project was developed as a Final Year Project for the Bachelor of Science in Software Engineering program at COMSATS University Islamabad.

## Features
- **Admin Dashboard**: Manage user accounts, including lecturers and students, and oversee sections and system-wide data.
- **Lecturer Dashboard**: Create laboratory tasks, assign them to sections, and monitor student performance and rankings.
- **Student Dashboard (IDE)**: An integrated coding environment where students can write, compile, and submit Java code against predefined test cases.
- **Assessment Engine**: Automatically evaluates submitted code, compares actual output with expected output, and provides detailed feedback and status reports.

## Technology Stack
- **Frontend**: React.js, Vite, Vanilla CSS
- **Backend**: Node.js, Express.js
- **Database**: SQLite

## Installation and Setup

### Prerequisites
- Node.js
- npm

### Backend Setup
1. Navigate to the backend directory:
   cd backend
2. Install the required dependencies:
   npm install
3. Start the backend server:
   node index.js
The server will run on http://localhost:3000.

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   cd frontend
2. Install the required dependencies:
   npm install
3. Start the development server:
   npm run dev

## Usage
The application has three main roles:
1. **Student**: Can access the IDE to write code and submit tasks.
2. **Lecturer**: Can create new coding assignments and evaluate student progress.
3. **Admin**: Can register new users and assign lecturers to sections.

To use the system locally, ensure both the frontend and backend servers are running concurrently.
