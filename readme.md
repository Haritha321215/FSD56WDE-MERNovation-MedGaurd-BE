# MedGaurd Application User Management Backend
### Description
This is a backend application built with Node.js, Express, and MongoDB for user management. It provides RESTful APIs for user authentication, registration, profile management, and other user-related functionalities.

### Features
- User authentication (login, logout)
- User registration
- User profile management (update profile, change password)
- CRUD operations for user data

### Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose (MongoDB ODM)
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing
- Morgan for log requests to the console

 ### Installation
    - Express- npm i express
    - Mongoose - npm i mongoose
    - Dotenv - npm i dotenv
    - Nodemon npm install --save-dev nodemon
    - Bcrypt - npm i bcrypt
    - Cookie-parser - npm i cookie-parser
    - Cors - npm i cors
    - Json web token - npm i jsonwebtoken
    - Morgan - npm i morgan console

### Server Configuration
    - Ensure that the application in running on server port 3006



## API Endpoints

### Users
- POST /api/users/register: Register a new user
- POST /api/users/login: Login a user
- GET /api/users/profile: Get the user profile
- GET /api/users/logout: logout the user
- PUT /api/users/profile: Update the user profile
- DELETE /api/users/profile: Delete the user profile



## Licences






