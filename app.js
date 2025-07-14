import dotenv from "dotenv";
import express from "express";
import { connect } from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { bookRoutes } from "./routes/bookRoutes.js";
import { genreRoutes } from "./routes/genreRoutes.js";
import { authorRoutes } from "./routes/authorRoutes.js";
import multer from "multer";
import path from "path";

dotenv.config();
const app = express();
app.use(cors());
app.use("/images", express.static(path.join(process.cwd(), "images")));
app.use(bodyParser.json());
const uri = process.env.DB_URI;
const port = process.env.BACKEND_PORT;

app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/genres", genreRoutes);
app.use("/api/v1/authors", authorRoutes);

app.get("/", (req, res) => {
  res.send("welcome");
});

const myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    const extName = path.extname(file.originalname);
    const imagename = req.body.username + extName;
    cb(null, imagename);
  },
});

const upload = multer({
  storage: myStorage,
});

app.post("/", upload.single("photo"), (req, res) => {
  res.send(req.file.path);
});

connect(uri).then(() => {
  console.log("db connected");
});

app.listen(port, () => {
  console.log(`isleyir http://localhost:${port}`);
});
