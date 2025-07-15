import { model, Schema, Types } from "mongoose";

const authorSchema = new Schema(
  {
    name: String,
    surname: String,
    age: Number,
  },
  { versionKey: false }
);

export const authorModel = model("author", authorSchema);
