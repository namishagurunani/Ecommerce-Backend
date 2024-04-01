# E-Commerce Application Backend API Documentation

Welcome to the documentation for the E-Commerce Application Backend API. This document provides an overview of the available endpoints, their functionalities, and usage instructions.

## Introduction

This API serves as the backend for our E-Commerce Application, providing various endpoints to manage products, orders, users, and authentication.

**Base URL**: `https://ecommerce-backend-1-g65t.onrender.com/api/v1`

## Endpoints

### Authentication

- `POST /user/login`: Log in with a username and password to obtain an access token.
- `POST /user/register`: Register a new user account.
- `POST /user/logout`: Log out a user.
- `POST /user/forgot-password`: forgot password.
- `POST /user/reset-password/:email`: reset password.


### Address Update

- `POST /user/address`: Update the address of the user.

### Wishlist

- `POST /user/wishlist`: Users can add products to their wishlist.
- `GET /user/wishlist`: Retrieve the whole wishlist.

### Products

- `POST /product`: Create a new product.
- `PATCH /product`: Update a product.
- `GET /product`: Retrieve details of products.
- `DELETE /product`: Delete a product by ID.
- `POST /product/like/{product_id}`: Like a product.
- `POST /product/dislike/{product_id}`: Dislike a product.
- `GET /product/product_details?productId={product_id}`: Get details for a particular product.

### Coupon

- `POST /coupon`: Post a coupon with a discount.
- `GET /coupon`: Get the list of coupons.

### Cart

- `POST /cart`: Add items to the cart.
- `Get /cart`: get items details in the cart.

### Orders

- `GET /order`: Retrieve a list of all orders.
- `GET /order/{id}`: Retrieve details of a specific order by ID.
- `POST /order`: Place a new order.
- `PUT /order/{id}`: Update status of an existing order by ID.
- `DELETE /order/{id}`: Cancel an order by ID.

### Users

- `GET /user/{id}`: Retrieve user details by ID.
- `PUT /user/{id}`: Update user details by ID.
- `DELETE /user/{id}`: Delete user account by ID.

## Error Handling

Errors are returned in JSON format with appropriate status codes and messages. Refer to the API documentation for specific error responses.

## Rate Limiting

To ensure fair usage and prevent abuse, API requests are rate-limited. The rate limits are subject to change based on usage patterns and server load.

## Authentication

Most endpoints require authentication using an API key. Include the API key in the request headers as follows: `Authorization: Bearer <API_KEY>`


