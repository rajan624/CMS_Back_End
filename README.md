# Social Media Dashboard Backend API

This is the backend API for a Social Media Dashboard project that supports user authentication, user data management, and real-time chat functionality. The API is built using Node.js, MongoDB, and Socket.io.

## Technologies Used

- **Node.js** - JavaScript runtime for building the API
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database for storing user data, messages, and other resources
- **Mongoose** - ODM (Object Data Modeling) library for MongoDB and Node.js
- **Socket.io** - Real-time bidirectional event-based communication for the chat feature
- **JWT** - JSON Web Tokens for authentication

## Features

- **User Authentication**: Secure login and registration using JWT.
- **User Data**: Endpoints to manage user profiles, posts, and social media activity.
- **Real-time Chat**: Instant messaging between users using Socket.io.
- **User Presence**: Track user online/offline status in real-time.
- **RESTful API**: Expose endpoints for CRUD operations on posts, users, and chats.

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login an existing user and receive a JWT token.
- `POST /api/auth/logout`: Logout a user by invalidating the JWT.

### Users

- `GET /api/users/:id`: Get user profile data by user ID.
- `PUT /api/users/:id`: Update user profile data.
- `DELETE /api/users/:id`: Delete a user profile.

### Posts

- `GET /api/posts`: Get all posts (pagination available).
- `POST /api/posts`: Create a new post.
- `GET /api/posts/:id`: Get a single post by ID.
- `PUT /api/posts/:id`: Update a post by ID.
- `DELETE /api/posts/:id`: Delete a post by ID.

### Chat

- `GET /api/chat`: Get all chat rooms for the logged-in user.
- `POST /api/chat`: Create a new chat room.
- `GET /api/chat/:roomId`: Get chat messages for a specific room.
- `POST /api/chat/:roomId`: Send a message to a specific chat room.

## Real-time Chat with Socket.io

The API supports real-time messaging using Socket.io. Once a user logs in, a WebSocket connection is established, allowing users to send and receive messages instantly in any active chat room.

- **User joins a room**: When a user joins a chat room, they will receive all messages from that room in real-time.
- **User sends a message**: When a user sends a message to a chat room, it will be broadcasted to all other users currently in the room.

## Setup

### Prerequisites

- Node.js (v14 or later)
- MongoDB instance (can be local or a cloud database like MongoDB Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/social-media-dashboard-backend.git
   cd social-media-dashboard-backend
