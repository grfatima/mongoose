import { model, Schema, Types } from "mongoose";

const genreSchema = Schema(
  {
    name: String,
  },
  { versionKey: false }
);

export const genreModel = model("genre", genreSchema);
