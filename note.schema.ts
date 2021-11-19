import { Schema } from "mongoose";

export const noteSchema = new Schema({
    title: { type : String, required: true},
    author: { type : String, required: true},
    description: { type : String, required: true},
    publishDate: { type : String, required: true},
    likes: { type : Number, required: true},
    publisher: { type : String, required: true},
});