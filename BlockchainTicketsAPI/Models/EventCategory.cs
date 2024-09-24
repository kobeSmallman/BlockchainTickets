using System;

namespace BlockchainTicketsAPI.Models
{
    public class EventCategory
    {
        public int eventcategoryid { get; set; }
        public string categoryname { get; set; } = string.Empty;
        public DateTime createdat { get; set; }
        public DateTime updatedat { get; set; }
    }
}
