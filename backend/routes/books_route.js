/**
 * This file defines the routes for handling book-related requests.
 * It uses the express Router to define routes for getting, creating, updating, and deleting books.
 * Each route uses the Book model to interact with the database.
 */
import express from "express";
import Book from "../models/book.js";

const router = express.Router();

/**
 * Route to get all books from the database.
 * It does not require any parameters.
 * It returns a JSON object with a count of the books and an array of the books.
 */
router.get("/", async (req, res) => {
  try {
    // Fetch all books from the database
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

/**
 * Route to get a book by its id from the database.
 * It requires the id of the book as a parameter.
 * It returns the book if found, otherwise it returns a 404 error.
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch the book by its id from the database
    const result = await Book.findById(id);
    return result
      ? res.status(200).send(result)
      : res.status(404).send("Book not found");
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Define a route to create a new book in the database.
/**
 * Route to create a new book in the database.
 * It requires the title, author, and publishedYear of the book in the request body.
 * It returns the created book if successful, otherwise it returns a 400 error.
 */
router.post("/", async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    // Check if all fields are present
    if (!title || !author || !publishedYear) {
      console.error("All fields are required");
      return res.status(400).send({ message: "All fields are required" });
    }

    // Create a new book instance
    const book = new Book({
      title,
      author,
      publishedYear,
    });

    // Save the new book to the database
    const result = await Book.create(book);
    return res.status(201).send(result);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Define a route to update a book by its id in the database.
/**
 * Route to update a book by its id in the database.
 * It requires the id of the book as a parameter and the new title, author, and publishedYear in the request body.
 * It returns the updated book if successful, otherwise it returns a 404 error if the book is not found or a 400 error for other failures.
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishedYear } = req.body;

    // Check if all fields are present
    if (!title || !author || !publishedYear) {
      console.error("All fields are required");
      return res.status(400).send({ message: "All fields are required" });
    }

    // Create a new book instance with the updated information
    const newBook = {
      title,
      author,
      publishedYear,
    };

    // Update the book in the database
    const result = await Book.findByIdAndUpdate(id, newBook);
    return result
      ? res.status(200).send(result)
      : res.status(404).send({ message: "Book not found" });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

// Define a route to delete a book by its id from the database.
/**
 * Route to delete a book by its id from the database.
 * It requires the id of the book as a parameter.
 * It returns the deleted book if successful, otherwise it returns a 404 error if the book is not found or a 400 error for other failures.
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Delete the book from the database
    const result = await Book.findByIdAndDelete(id);
    return result
      ? res.status(200).send(result)
      : res.status(404).send({ message: "Book not found" });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

export default router;
