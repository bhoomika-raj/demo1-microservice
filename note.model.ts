import { model, Model} from "mongoose";
import { INotes } from "src/interfaces/note.interfaces";
import { noteSchema } from "./../schema/note.schema";

export const Notes:Model<INotes> = model<INotes> ("note", noteSchema);

export default Notes;