using System;

namespace BlockchainTicketsAPI.Models
{
    public class Feedback
    {
        public int feedbackid { get; set; }
        public string feedbackcontent { get; set; } = string.Empty;
        public DateTime createdat { get; set; }
        public DateTime updatedat { get; set; }
    }
}
