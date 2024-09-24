using System;

namespace BlockchainTicketsAPI.Models
{
    public class EventCategoryMapping
    {
        public int eventcategorymappingid { get; set; }
        public int eventid { get; set; }
        public int categoryid { get; set; }
        public DateTime createdat { get; set; }
        public DateTime updatedat { get; set; }
    }
}
