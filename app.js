import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { bookModel } from "./schemas/bookSchema.js";
import { authorModel } from "./schemas/authorSchema.js";
import { genreModel } from "./schemas/genreSchema.js";
import bodyParser from "body-parser";
import { authorRoutes } from "./routes/authorRoutes.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());
const uri = process.env.DB_URI;
const port = process.env.BACKEND_PORT;

app.use("/api/v1/authors", authorRoutes);

connect(uri).then(() => {
  console.log("db connected");
});

app.listen(port, () => {
  console.log(`isleyir http://localhost:${port}`);
});
