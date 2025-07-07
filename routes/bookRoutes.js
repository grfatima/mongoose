import { Router } from "express";
import { bookModel } from "../schemas/bookSchema.js";

export const bookRoutes = Router();

// GET: butun kitablari
bookRoutes.get("/", async (req, res) => {
  try {
    const data = await bookModel.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: "Xeta" });
  }
});

// GET: ID ile kitablar
bookRoutes.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await bookModel.findById(id);
    if (!data) {
      return res.status(404).send({ message: "Kitab tapilmadi" });
    }
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: "Xeta" });
  }
});

// POST: kitab elave et

// DELETE: muellif sil
bookRoutes.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await bookModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ message: "Kitab tapilmadi." });
    }
    res.status(200).send({ message: "Ugurla silindi" });
  } catch (err) {
    res.status(500).send({ message: "Xeta" });
  }
});

// PUT: kitab yenile
