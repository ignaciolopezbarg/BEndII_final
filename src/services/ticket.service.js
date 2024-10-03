import TicketRepository from '../repositories/ticket.repository.js';

class TicketService {
  async createTicket(amount, purchaser) {
    return await TicketRepository.createTicket(amount, purchaser);
  }
}

export default new TicketService();