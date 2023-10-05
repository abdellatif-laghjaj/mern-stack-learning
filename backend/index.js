import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import booksRoute from "./routes/books_route.js";

// Create an instance of an express app
const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Use express.json() middleware to parse incoming JSON requests

// Use cors middleware to enable Cross-Origin Resource Sharing

// Set up the '/books' route to use the booksRoute
app.use("/books", booksRoute);

// Define the root route that sends a 'Hello World!' response
app.get("/", (req, res) => {
  res.send("Hello World!");
});
