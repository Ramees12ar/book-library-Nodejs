import mongoose from "../database/connect.mjs";

const { Schema } = mongoose;

const booksSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["active", "deleted"],
            default: "active",
        },
        createdAt: {
            type: Date, default: Date,
        },
        deletedAt: {
            type: Date,
        },
    },
);

export default mongoose.model("books", booksSchema, "books");
