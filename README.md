# Friends App (MERN)

A social app where users can create accounts, send/receive friend requests, and get recommended friends. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Live preview : https://friends-app-ahhv.onrender.com/

## Features
- **User Account Creation**: Users can create accounts by providing a username and password.
- **Friend Requests**: Users can send friend requests to other users and accept incoming requests.
- **Friend Recommendations**: Users receive recommendations for new friends based on mutual connections.
- **Secure Authentication**: JWT (JSON Web Tokens) is used for secure user authentication to protect user sessions and data.

## Prerequisites

- Node.js
- MongoDB
- express.js
- npm/yarn
- Vite (for frontend)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/friends-app.git
```
2. cd friends-app

3. set .env :

in root directory:
```bash
PORT=Port_no.
MONGODB_URI=Mongo_uri
JWT_SECRET=your-secret-key
NODE_ENV=production
```
in client directory:
```bash
VITE_Backend_URL=your_domain/api/users
```
4. run build cmd from root directory
```bash
npm run build
```
5. run start cmd from root directory
```bash
npm start
```

