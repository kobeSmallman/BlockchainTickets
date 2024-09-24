using System;

namespace BlockchainTicketsAPI.Models
{
    public class TicketLog
    {
        public int ticketlogid { get; set; }
        public string action { get; set; } = string.Empty;
        public DateTime createdat { get; set; }
        public DateTime updatedat { get; set; }
    }
}
