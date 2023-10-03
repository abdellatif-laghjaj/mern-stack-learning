import express from "express";
import mongoose from "mongoose";
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(process.env.PORT);
    })
    .catch((err) => {
        console.error(err);
    })
