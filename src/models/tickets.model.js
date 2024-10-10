// import mongoose from "mongoose";
// import { v4 as uuidv4} from 'uuid'; //genera codigo unico automatico

// const ticketSchema = new mongoose.Schema({
//   code: {
//     type: String,
//     unique: true,
//     required: true,
//     default: function () {
//       return `Ticket - ${Math.random().toString()}`;
//     },
//     purchase_datatime: {
//       type: Date,
//       default: Date.now,
//       required: true,
//     },
//     amount: {
//       type: Number,
//       required: true,
//     },
//     purchaser: {
//       type: String,
//       required: true,
//     },
//   },
// });
// const TicketModel = mongoose.model("tickets", ticketSchema);
// export default TicketModel;

import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; //librería para generar codigo

const ticketCollection = "tickets";

const TicketSchema = new mongoose.Schema({
  code: {
    type: String,
    default: () => uuidv4(),
    required: true,
    unique: true,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
});

export const TicketModel = mongoose.model(ticketCollection, TicketSchema);

export default TicketModel;
