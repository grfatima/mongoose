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
  const data = req.body;

  if (data.age < 18) {
    res.status(400).send({
      massage: "yasin azdir",
    });
  } else if (data.name.trim() && data.surname.trim() && data.age) {
    authorModel.create(data);
    res.status(201).send(data);
  } else {
    res.status(400).send({
      massage: "duzgun yaz",
    });
  }
  res.send(data);
});

// delete request
authorRoutes.delete("/:id", (req, res) => {
  const id = req.params.id;
  authorModel
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

// put request
authorRoutes.put("/:id", (req, res) => {
  const data = req.body;
  const id = req.params.id;
  if (data.age < 18) {
    res.status(400).send({
      massage: "yas 18den boyuk olmalidir",
    });
  } else if (data.name.trim() && data.surname.trim() && data.age) {
    authorModel.findByIdAndUpdate(id, data);
    res.status(200).send(data);
  } else {
    res.status(400).send({
      massage: "duzgun yaz ",
    });
  }
  res.status(200).send(data);
});
 