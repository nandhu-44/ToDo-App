# [<img src="client/public/checkmark.png" style="height:1.5rem;"/> Todo App](https://todo-nandhu.vercel.app)

This is a Todo application built using the MERN stack. It allows users to manage their tasks effectively.

## Features

- User Authentication
- Create, Update, Delete Todos
- Clear Completed Todos
- Reset Password

## Installation

1. Clone the repository

```bash
git clone https://github.com/nandhu-44/ToDo-App.git
```

2. Install dependencies

```bash
cd ToDo-App
cd client && npm install
cd ../server && npm install
```

3. Create a `.env` file in the `server` directory and add the following environment variables

```bash
# DB Config
MONGO_URI="Your MongoDB URI"

# Frontend Config (default)
CLIENT_URL="http://localhost:5173"

# Nodemailer config
NODEMAILER_EMAIL="Your nodemailer email"
NODEMAILER_APP_PASSWORD="Your nodemailer app password"

# Cipher-Guard config
CIPHER_GUARD_KEY="Your cipher-guard key"
CIPHER_GUARD_SALT="Your cipher-guard salt"
```

4. Create a `.env` file in the `client` directory and add the following environment variables

```bash
# Backend Config (default)
VITE_BACKEND_URL="http://localhost:8000"
```

## Usage

1. Start the server

```bash
cd server && npm start
```

2. Start the client

```bash
cd client && npm run dev
```

<p style="font-size:2rem; font-weight:bold; text-align:center;"> OR </p>

1. Start both the server and client using the following command
```bash
npm start
```

## Working

### Client

The client side of the application is built using React and Vite. It uses the Context API for state management and React Router for routing.


### Server

The server side of the application is built using Node.js, Express, and MongoDB. It has RESTful APIs for user authentication and managing todos and uses nodemailer for sending emails.