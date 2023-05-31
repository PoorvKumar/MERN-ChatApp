# Chat App

A real-time chat application built with the MERN (MongoDB, Express, React, Node.js) stack, Socket.io, and Chakra UI.

## Features

- Real-time messaging: Users can send and receive messages in real-time.
- User authentication: Users can sign up, log in, and log out securely.
- Room-based chat: Users can join different chat rooms and have separate conversations.
- Online status: Users can see who is currently online.

## Technologies Used

- **MERN Stack**:
  - MongoDB: Document-oriented NoSQL database for storing user data and chat messages.
  - Express: Fast and minimalist web application framework for Node.js.
  - React: JavaScript library for building user interfaces.
  - Node.js: JavaScript runtime environment for server-side development.
- **Socket.io**: Real-time bidirectional event-based communication library.
- **Chakra UI**: Simple and modular component library for building user interfaces.

## Installation

To run the chat app locally, follow these steps:

1. Clone the repository: <code>git clone https://github.com/PoorvKumar/MERN-ChatApp.git</code>
2. Navigate to the project directory: <code>cd MERN-ChatApp</code>
3. Install dependencies(in both backened and frontend): <code>npm install</code> 
4. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Define the following environment variables:
     - `MONGODB_URI`: Connection URI for your MongoDB database.
     - `JWT_SECRET`: Secret key for JWT authentication.

5. Start the development server(both server and client): <code>npm start</code>





