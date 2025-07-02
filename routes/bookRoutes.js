import { Router } from "express";
import { bookModel } from "../schemas/bookSchema.js";

export const bookRoutes = new Router();

// get request
bookRoutes.get("/", async (req, res) => {
  const data = await bookModel.find();
  res.status(200).send(data);
});

bookRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  const data = await bookModel.findById(id);
  res.status(200).send(data);
});

// delete request
bookRoutes.delete("/:id", (req, res) => {
  const id = req.params.id;
  bookModel
    .findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({
        massage: "ugurla silindi",
      });
    })
    .catch(() => {
      res.status(500).send({
        massage: "tapilmadi",
      });
    });
});
