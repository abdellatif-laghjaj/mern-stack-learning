/**
 * This file defines the Book model using Mongoose.
 * The Book model represents a book in the database with fields for title, author, and published year.
 * It also includes timestamps for created at and updated at.
 */
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    // The title of the book
    title: {
      type: String,
      required: true,
    },
    // The author of the book
    author: {
      type: String,
      required: true,
    },
    // The year the book was published
    publishedYear: {
      type: Number,
      required: true,
    },
  },
  {
    // Automatically include timestamps for created at and updated at
    timestamps: true,
  },
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
