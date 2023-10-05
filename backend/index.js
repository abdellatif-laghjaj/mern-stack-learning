import express from "express";
import mongoose from "mongoose"; 
import booksRoute from "./routes/books_route.js";
import Book from "./models/book.js";
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

app.use(express.json());

// routes
app.use("/books", booksRoute);

// index
app.get("/", (req, res) => {
  res.send("Hello World!");
});
