import { model, Schema, Types } from "mongoose";

const genreSchema = Schema(
  {
    name: String,
    books: [
      {
        type: Types.ObjectId,
        ref: "book",
      },
    ],
  },
  { versionKey: false }
);

export const genreModel = model("genre", genreSchema);
