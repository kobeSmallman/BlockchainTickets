using System;

namespace BlockchainTicketsAPI.Models
{
    public class Ticket
    {
        public int ticketid { get; set; }
        public DateTime createdat { get; set; }
        public DateTime updatedat { get; set; }
    }
}
