import TicketModel from '../models/Ticket.js';

class TicketRepository {
  async createTicket(amount, purchaser) {
    const ticket = new TicketModel({
      code: Date.now().toString(),
      purchase_datetime: new Date(),
      amount,
      purchaser,
    });
    return await ticket.save();
  }
}

export default new TicketRepository();