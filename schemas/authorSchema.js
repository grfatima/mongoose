import { model, Schema, Types } from "mongoose";

const authorSchema = new Schema(
  {
    name: String,
    surname: String,
    age: Number,
    books: [
      {
        type: Types.ObjectId,
        ref: "book",
      },
    ],
  },
  { versionKey: false }
);

export const authorModel = model("author", authorSchema);
