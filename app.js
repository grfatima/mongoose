import dotenv from "dotenv";
import express from "express";
import { connect } from "mongoose";
import bodyParser from "body-parser";
import { bookRoutes } from "./routes/bookRoutes.js";
import { genreRoutes } from "./routes/genreRoutes.js";
import { authorRoutes } from "./routes/authorRoutes.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());
const uri = process.env.DB_URI;
const port = process.env.BACKEND_PORT;

app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/genres", genreRoutes);
app.use("/api/v1/authors", authorRoutes);

connect(uri).then(() => {
  console.log("db connected");
});

app.listen(port, () => {
  console.log(`isleyir http://localhost:${port}`);
});
