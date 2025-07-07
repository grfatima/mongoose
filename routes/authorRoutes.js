import { Router } from "express";
import { authorModel } from "../schemas/authorSchema.js";

export const authorRoutes = Router();

// GET: butun muellifler
authorRoutes.get("/", async (req, res) => {
  try {
    const data = await authorModel.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: "Xeta" });
  }
});

// GET: ID ile muellif
authorRoutes.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await authorModel.findById(id);
    if (!data) {
      return res.status(404).send({ message: "Muellif tapilmadi" });
    }
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: "Xeta" });
  }
});

// POST: muellif elave et
authorRoutes.post("/", async (req, res) => {
  try {
    const data = req.body;

    if (data.age < 18) {
      return res.status(400).send({ message: "Yas 18-den asagi ola bilmez." });
    }

    if (data.name?.trim() && data.surname?.trim() && data.age) {
      const newAuthor = await authorModel.create(data);
      return res.status(201).send(newAuthor);
    } else {
      return res.status(400).send({
        message: "Zehmet olmasa butun melumatlari duzgun daxil edin.",
      });
    }
  } catch (err) {
    res.status(500).send({ message: "Xeta" });
  }
});

// DELETE: muellif sil
authorRoutes.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await authorModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ message: "Muellif tapilmadi." });
    }
    res.status(200).send({ message: "Ugurla silindi" });
  } catch (err) {
    res.status(500).send({ message: "Xeta" });
  }
});

// PUT: muellif yenile
authorRoutes.put("/:id", async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;

    if (data.age < 18) {
      return res.status(400).send({ message: "Yas 18-den boyuk olmalidir" });
    }

    if (data.name?.trim() && data.surname?.trim() && data.age) {
      const updated = await authorModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!updated) {
        return res.status(404).send({ message: "Muellif tapilmadi" });
      }
      res.status(200).send(updated);
    } else {
      res
        .status(400)
        .send({ message: "name, surname və age duzgun olmalidir" });
    }
  } catch (err) {
    res.status(500).send({ message: "Xeta" });
  }
});
