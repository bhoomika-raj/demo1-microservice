// import { userInfo } from "os";
// import {  logger } from "../config/logger.config";
import { INotes } from "./../interfaces/note.interfaces";
import Notes from "./../models/note.model";

export class NotesService{
   static async createNotes(noteData : INotes){
        console.log("Create function invoked");
        const notes = new Notes();
        notes.title = noteData.title;
        notes.author = noteData.author;
        notes.description = noteData.description;
        notes.publishDate = noteData.publishDate;
        notes.likes =  noteData.likes;
        notes.publisher= noteData.publisher;
        const savedNotes = await notes.save();
        console.log(savedNotes);
        return { message : "Data stored successfully", savedNotes};
        }
        

    static async getNotesbyId(Id:string){
        return Notes.findById(Id);
    }

    static async getAllNotes(){
        console.log("fetching all Notes");
        return Notes.find();
    }

    static async updateNotesById(noteId:string, updateNote:INotes){
          const notes= await this.getNotesbyId(noteId);
          await Notes.findByIdAndUpdate({Id: noteId}, {title: updateNote.title ?? notes.title, author:updateNote.author ?? notes.author, description:updateNote.description ?? notes.description, publishDate: updateNote.publishDate ?? notes.publishDate, likes:updateNote.likes ?? notes.likes, publisher: updateNote.publisher ?? notes.publisher});
          return { message : "Notes updated Successfully"};
        }

    // static async deleteNotesById(noteId:string, deleteNote:INotes){
    //         const notes= await this.getNotesbyId(noteId);
    //         await Notes.findByIdAndDelete({Id: noteId}, {title: deleteNote.title ?? notes.title, author:deleteNote.author ?? notes.author, description:deleteNote.description ?? notes.description, publishDate: deleteNote.publishDate ?? notes.publishDate, likes:deleteNote.likes ?? notes.likes, publisher: deleteNote.publisher ?? notes.publisher});
    //         return { message : "Notes deleted Successfully"};
    //       }

    static async deleteNotesById(noteId:string){
        const notes= await this.getNotesbyId(noteId);
        await Notes.findByIdAndDelete({Id: noteId});
        return { message : "Note deleted Successfully"};
      }
  
     }