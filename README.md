
# MERN Ecommerce


![Screenshot from 2023-09-11 16-44-51](https://github.com/acharyamanish006/MERN-Ecommerce/assets/100832817/70add99b-a525-4da6-bfa3-cc09497e34fc)

A Full-Stack Ecommerce application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. This project replicates major functionalities found in popular e-commerce websites, including user authentication, product management, shopping cart, and more.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)


## Features

- **User Authentication**
  - User can create an account.
  - User can log in or sign up with email and password.
  - Passwords are securely hashed and stored.

- **Product Management**
  - Users can search for products.
  - Users can sell products by creating product listings.
  - Product listings include images, descriptions, and prices.
  - Users can view product details.

- **User Interaction**
  - Users can add products to their shopping cart.
  - Users can add products to their wishlist.
  - Users can add reviews and ratings for products.
  - Users can view their order history.

- **Database**
  - User data, product listings, and order history are stored in a database.
  - Database interactions are handled securely and efficiently.

- **Security**
  - Authentication is secure and includes measures to prevent common security vulnerabilities.

## Technologies Used

- **Frontend**
  - React.js
  - CSS
  - Redux (for state management)

- **Backend**
  - Node.js
  - Express.js
  - MongoDB 

- **Authentication**
  - JSON Web Tokens (JWT)

- **Other Tools and Libraries**
  - Axios (for making HTTP requests)
  - bcrypt (for password hashing)
  - multer (for file uploads)

## Getting Started

To run the MERN Ecommerce application on your local machine, follow these steps:

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/acharyamanish006/MERN-Ecommerce.git
   ```

2. Navigate to the project directory:
   ```bash
   cd MERN-Ecommerce
   ```

3. Install the required dependencies for both the frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

4. Configure your database settings and environment variables.

5. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

6. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

The application should now be running locally at `http://localhost:3000`.

## Usage

1. Open a web browser and go to `http://localhost:3000`.

2. Create a user account or log in with an existing account.

3. Explore the various features of the application, including searching for products, adding items to the cart, creating product listings, and more.



## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow the standard GitHub fork and pull request workflow.

1. Fork the repository.

2. Clone your forked repository to your local machine.

3. Create a new branch for your feature or bug fix: `git checkout -b feature-name`.

4. Make your changes and commit them with a descriptive commit message.

5. Push your changes to your fork on GitHub.

6. Create a pull request from your forked repository to the original repository.

7. Describe your changes and submit the pull request.

