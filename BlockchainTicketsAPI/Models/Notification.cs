using System;

namespace BlockchainTicketsAPI.Models
{
    public class Notification
    {
        public int notificationid { get; set; }
        public string notificationcontent { get; set; } = string.Empty;
        public DateTime createdat { get; set; }
        public DateTime updatedat { get; set; }
    }
}
