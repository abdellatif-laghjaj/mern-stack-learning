import express from "express";
import mongoose from "mongoose";
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

// index
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).send(books);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// store new book
app.post("/books", async (req, res) => {
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
