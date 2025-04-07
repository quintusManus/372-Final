# My E-Commerce Node Project

## Overview
A simple ecommerce backend using Node.js, Express, and SQLite. Serves static frontend prototypes
from `public/` and provides REST APIs under `/api`.

## Installation
1. Clone this repo
2. `npm install`

## Database Setup
1. `sqlite3 db/ecommerce.db < db/create_tables.sql`
2. `sqlite3 db/ecommerce.db < db/insert_categories.sql`
3. `sqlite3 db/ecommerce.db < db/insert_products.sql`

## Run
Then visit: http://localhost:3000/

## API Endpoints
- **GET** `/api/products` – Returns list of products
- **GET** `/api/products/search?q=keyword`
- **POST** `/api/products` – Create new product (admin)
- ...