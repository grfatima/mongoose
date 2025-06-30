import { Router } from "express";
import { authorModel } from "../schemas/authorSchema.js";

export const authorRoutes = new Router();

// get request
authorRoutes.get("/", async (req, res) => {
  const data = await authorModel.find();
  res.status(200).send(data);
});

authorRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  const data = await authorModel.findById(id);
  res.status(200).send(data);
});

// post request
authorRoutes.post("/", (req, res) => {
    
});
