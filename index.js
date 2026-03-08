import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.redirect("/view/students");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running");
});