import TicketModel from "../models/tickets.model.js";
import { v4 as uuidv4 } from 'uuid';

class TicketDao {
    async create ({ amount, purchaser }){
        const ticket = new TicketModel({
            purchase_datetime: new Date(),
            amount,
            purchaser
        });
        return await ticket.save();
    }

    async getById(ticketId){
        return await TicketModel.findById(ticketId);
    }
    async getAll(){
        return await TicketModel.find();
    }
}
export default new TicketDao();