import { Router } from "express";
import { genreModel } from "../schemas/genreSchema.js";

export const genreRoutes = Router();

// GET: butun janrlar
genreRoutes.get("/", async (req, res) => {
  try {
    const data = await genreModel.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: "Xeta" });
  }
});

// GET: ID ile muellif
genreRoutes.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await genreModel.findById(id);
    if (!data) {
      return res.status(404).send({ message: "Janr tapilmadi" });
    }
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: "Xeta" });
  }
});

// POST: janr elave et
genreRoutes.post("/", async (req, res) => {
  try {
    const data = req.body;

    if (data.name?.trim()) {
      const newGenre = await genreModel.create(data);
      return res.status(201).send(newGenre);
    } else {
      return res.status(400).send({
        message: "Zehmet olmasa butun melumatlari duzgun daxil edin.",
      });
    }
  } catch (err) {
    res.status(500).send({ message: "Xeta" });
  }
});

// DELETE: janr sil
genreRoutes.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await genreModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ message: "janr tapilmadi." });
    }
    res.status(200).send({ message: "Ugurla silindi" });
  } catch (err) {
    res.status(500).send({ message: "Xeta" });
  }
});

// PUT: janr yenile
genreRoutes.put("/:id", async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;

    if (data.name?.trim()) {
      const updated = await genreModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!updated) {
        return res.status(404).send({ message: "Janr tapilmadi" });
      }
      res.status(200).send(updated);
    } else {
      res.stgenre(400).send({ message: "name duzgun olmalidir" });
    }
  } catch (err) {
    res.status(500).send({ message: "Xeta" });
  }
});
