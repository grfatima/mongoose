import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.BACKEND_PORT;

app.listen(port, () => {
  console.log(`isleyir http://localhost:${port}`);
});
