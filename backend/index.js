import express from "express";
import mongoose from "mongoose"; 
import cors from "cors";
import booksRoute from "./routes/books_route.js";

// create express app
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

app.use(cors());

// routes
app.use("/books", booksRoute);

// index
app.get("/", (req, res) => {
  res.send("Hello World!");
});
