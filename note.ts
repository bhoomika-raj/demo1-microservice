import * as fs from "fs";
import express, { Router } from "express";
import bodyParser from "body-parser";
// import { logger } from "./config/logger.config";
import {INotes} from "./interfaces/note.interfaces";
import Notes from "././models/note.model";
import { NotesService } from "./service/note.service";
import {connect} from "mongoose";

let router = Router();

let logfile = (req, res, next) => {
  let current_datetime = new Date();
  let formatted_date =
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds();
  let method = req.method;
  let url = req.url;
  let log = `[${formatted_date}] ${method}:${url}`;
  fs.appendFile("request.log", log + "\n", (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
};

   router.route("/note").post(async(req, res) => {
    const note: any={
        
        title:req.body.title,
        description:req.body.description,
        author:req.body.author,
        publishDate : req.body.publishDate,
        likes:req.body.likes,
        publisher : req.body.publisher
    };
   console.log(note);
   const savedresult = await NotesService.createNotes(note);
   console.log(savedresult);
   res.send(savedresult);
  });

//   router.route("/note").get(async(req, res) => {
//     const notes= await NotesService.getAllNotes();
//     res.send({ notes});
// });


router.route("/notes").get(async(req,res)=>{
  try{
    const notes=await NotesService.getAllNotes();
    res.send({notes});
 
  }
  catch(error){
      console.log({error});
      res.send({message:"something went wrong"});
  }
});

router.route("/notes/:id").get(async(req,res)=>{
  const results = await Notes.findById(req.params.id);
  if(!results){
    console.log("note with id not found");
    res.send({message:"notes not found"});
   }
  return res.send(results);

});

router.route("/notes/:id").put(async(req,res)=>{
  console.log({params:req.params,queries:req.query});
  console.log(req.body);
  const result = await Notes.findByIdAndUpdate(req.params.id,req.body);
  return res.send({result});
  console.log("Updated" +result);
  
});

 router.route("/notes/:id").delete(async (req, res) => {
    // const result = await NotesService.deleteNotesById(req.params.id);
    // res.send(result);
    const result = await Notes.findByIdAndDelete(req.params.id);
    return res.send(result);
    console.log("deleted");
});



 
export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.configureMiddlewares();
    this.initialSetup();
    this.connectDatabase();
  }

  private configureMiddlewares() {
    this.app.use(bodyParser());
    //this.app.use(logMiddleware);
  }

  private initialSetup() {
    this.app.use("/", router);
  }

  private async connectDatabase(){
    connect("mongodb://localhost:27017/notes",{},(error:any)=>{
      if(error){
          console.log(error);
          process.exit();
      }
      console.log("Data base connected");
     });
  }

}
