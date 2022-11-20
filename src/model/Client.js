import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true},
  _id : {type: String, default: uuidv4()},
})

const Client = mongoose.model("Client", ClientSchema);

export default Client;
