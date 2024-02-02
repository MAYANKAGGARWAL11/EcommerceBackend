# Ecommerce API README

This document provides documentation for the Ecommerce API, outlining how to run the project, interact with the API, architectural decisions, assumptions made, and other necessary instructions.

## Table of Contents

1. [Introduction](#introduction)
2. [Project Setup](#project-setup)
3. [API Endpoints](#api-endpoints)
4. [Architectural Decisions](#architectural-decisions)
5. [Assumptions](#assumptions)
6. [Additional Instructions](#additional-instructions)
7. [PostmanCollection](#PostmanCollection)
8. [ProjectStructure](ProjectStructure) 
## 1. Introduction

The Ecommerce API is designed to manage products and their variants in an ecommerce system. It provides endpoints for creating, updating, deleting, and retrieving products and their associated variants.

## 2. Project Setup

### Requirements

- Node.js
- MongoDB

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   cd <project-folder>
   npm install
   ```

3. Start the MongoDB server:

   ```bash
   # Ensure MongoDB is installed
   # Start MongoDB server
   mongod
   ```

4. Run the application:

   ```bash
   npm start
   ```

   The API will be available at `http://localhost:3000`.

## 3. API Endpoints

### Products

- **GET /products**: Get a list of all products.
- **GET /products/:productId**: Get details of a specific product.
- **POST /products**: Create a new product.
- **PUT /products/:productId**: Update details of a specific product.
- **DELETE /products/:productId**: Delete a specific product.

### Variants

- **GET /products/:productId/variants**: Get a list of variants for a specific product.
- **GET /products/:productId/variants/:variantId**: Get details of a specific variant for a product.
- **POST /products/:productId/variants**: Add a new variant to a product.
- **PUT /products/:productId/variants/:variantId**: Update details of a specific variant for a product.
- **DELETE /products/:productId/variants/:variantId**: Delete a specific variant from a product.

## 4. Architectural Decisions

- **Express.js**: Chosen as the web application framework for its simplicity and flexibility.
- **MongoDB**: Used as the database to store product and variant information.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js, used for modeling and interacting with the database.
- **Promises and Async/Await**: Used for handling asynchronous operations, improving readability and error handling in the code.

## 5. Assumptions

- The MongoDB server is running locally on the default port (27017).
- The API assumes proper validation of input data is done on the client side or through middleware.

## 6. Additional Instructions

- The API uses the following HTTP methods: GET, POST, PUT, DELETE.
- Ensure proper authorization and authentication mechanisms are implemented in a production environment.
- Refer to the API endpoints section for detailed information on each route and its functionality.
## 7. Postman Collection
- It is preseny the collection_postman folder
  
## 8. Project Structure
- app.js: Entry point for the application.
- routes/index.js: Defines the API routes.
- models/Product.js: Mongoose model for products.
- models/Variant.js: Mongoose model for product variants.
- test/: Contains test files for models and endpoints.
