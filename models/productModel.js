/**
 * models/productModel.js
 * Methods to interact with the `products` table in the SQLite DB.
 */
const db = require("../db/database");

/**
 * Get all products.
 * @return {Promise<Array>} array of product objects
 */
function getAllProducts() {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM products ORDER BY id DESC`;
    db.all(sql, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

/**
 * Get a single product by ID.
 * @param {number} productId - product primary key
 * @return {Promise<object>} single product object
 */
function getProductById(productId) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM products WHERE id = ?`;
    db.get(sql, [productId], (err, row) => {
      if (err) return reject(err);
      resolve(row); // row or undefined
    });
  });
}

/**
 * Search products by keyword in name or category name.
 * @param {string} keyword
 * @return {Promise<Array>} results
 */
function searchProducts(keyword) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT p.*
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE LOWER(p.name) LIKE LOWER(?)
     OR LOWER(c.name) LIKE LOWER(?)
      ORDER BY p.id DESC
    `;
    const likeQuery = `%${keyword}%`;
    db.all(sql, [likeQuery, likeQuery], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

/**
 * Insert a new product (admin).
 * @param {object} productData
 * @return {Promise<number>} newly inserted product ID
 */
function createProduct(productData) {
  const { name, description, image_url, price, category_id } = productData;
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO products (name, description, image_url, price, category_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(
      sql,
      [name, description, image_url, price, category_id],
      function (err) {
        if (err) return reject(err);
        resolve(this.lastID);
      }
    );
  });
}

/**
 * Update an existing product by ID (admin).
 * @param {number} id
 * @param {object} productData
 * @return {Promise<number>} number of rows updated
 */
function updateProduct(id, productData) {
  const { name, description, image_url, price, category_id } = productData;
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE products
      SET name = ?, description = ?, image_url = ?, price = ?, category_id = ?
      WHERE id = ?
    `;
    db.run(
      sql,
      [name, description, image_url, price, category_id, id],
      function (err) {
        if (err) return reject(err);
        resolve(this.changes); // 1 if updated, 0 if not found
      }
    );
  });
}

module.exports = {
  getAllProducts,
  getProductById,
  searchProducts,
  createProduct,
  updateProduct,
};
