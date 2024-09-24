using System;

namespace BlockchainTicketsAPI.Models
{
    public class Event
    {
        public int eventid { get; set; }
        public string eventname { get; set; } = string.Empty;
        public DateTime createdat { get; set; }
        public DateTime updatedat { get; set; }
    }
}
