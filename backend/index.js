import express from "express";

const app = express();

app.get("/", (req, res) => {
    console.log("Request", req);
    res.status(200).send("Hello from Bun!");
})

app.listen(process.env.PORT, () => {
   console.log("Server started at port: " + process.env.PORT);
})