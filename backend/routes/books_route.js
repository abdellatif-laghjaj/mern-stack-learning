import express from "express";
import Book from "../models/book.js";

const router = express.Router();

// Define a route to get all books from the database.
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Define a route to get a book by its id from the database.
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findById(id);
    return result
      ? res.status(200).send(result)
      : res.status(404).send("Book not found");
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Define a route to create a new book in the database.
router.post("/", async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    // check if all fields are present
    if (!title || !author || !publishedYear) {
      console.error("All fields are required");
      return res.status(400).send({ message: "All fields are required" });
    }

    const book = new Book({
      title,
      author,
      publishedYear,
    });

    const result = await Book.create(book);
    return res.status(201).send(result);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Define a route to update a book by its id in the database.
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishedYear } = req.body;

    if (!title || !author || !publishedYear) {
      console.error("All fields are required");
      return res.status(400).send({ message: "All fields are required" });
    }

    const newBook = {
      title,
      author,
      publishedYear,
    };
    const result = await Book.findByIdAndUpdate(id, newBook);
    return result
      ? res.status(200).send(result)
      : res.status(404).send({ message: "Book not found" });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

// Define a route to delete a book by its id from the database.
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    return result
      ? res.status(200).send(result)
      : res.status(404).send({ message: "Book not found" });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

export default router;
