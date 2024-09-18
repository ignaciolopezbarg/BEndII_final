import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true,
    default: function () {
      return `Ticket - ${Math.random().toString()}`;
    },
    purchase_datatime: {
      type: Date,
      default: Date.now,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    purchaser: {
      type: String,
      required: true,
    },
  },
});
const TicketModel = mongoose.model("tickets", ticketSchema);
export default TicketModel;
