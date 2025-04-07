# My E-Commerce Node Project

## Overview
A simple ecommerce backend using Node.js, Express, and SQLite. It serves static
frontend prototypes from `public/` and provides REST APIs under `/api`.

## Installation
1. Clone this repository:  
   `git clone https://github.com/quintusManus/CSC372-BigProject.git && cd CSC372-BigProject`
2. Install dependencies:  
   `npm install`

## Database Setup
1. `sqlite3 db/ecommerce.db < db/create_tables.sql`
2. `sqlite3 db/ecommerce.db < db/insert_categories.sql`
3. `sqlite3 db/ecommerce.db < db/insert_products.sql`

(If you need to reset, run `sqlite3 db/ecommerce.db < db/drop_tables.sql` first.)

## Run
`npm start`
or
`node server.js`
or 
'nodemon server.js' if you have nodemon.

Visit http://localhost:3000/ to view the static pages.

## API Endpoints

### Products
- **GET** `/api/products`  
  Returns an array of all products.

- **GET** `/api/products/:id`  
  Returns a single product by its ID.

- **GET** `/api/products/search?q=keyword`  
  Searches for products by name or category.

- **POST** `/api/products` (admin)  
  Creates a new product. Expects JSON body like:

{
“name”: “New GPU”,
“description”: “Powerful GPU”,
“image_url”: “images/gpu.png”,
“price”: 699.99,
“category_id”: 1
}

- **PUT** `/api/products/:id` (admin)  
Updates an existing product. Expects a JSON body with fields to change.

### Carts
- **GET** `/api/carts/user/:userId`  
Retrieves or creates a cart for the given user.

- **GET** `/api/carts/:cartId`  
Returns cart details, including items.

- **POST** `/api/carts/:cartId/products`  
Adds a product to the specified cart. JSON body example:

{
“productId”: 2,
“quantity”: 1
}

- **DELETE** `/api/carts/:cartId/products/:cartProductId`  
Removes a line item from the cart.

- **POST** `/api/carts/:cartId/checkout`  
Marks the cart as purchased and clears items.

### Users
- **POST** `/api/users`  
Creates a new user (shopper or admin). JSON body example:

{
“name”: “Alice”,
“email”: “alice@example.com”,
“password”: “Secret123”,
“user_type”: “shopper”
}

- **GET** `/api/users/:id`  
Retrieves a user by ID.

- **PUT** `/api/users/:id`  
Updates user record (e.g., name, password, etc.).