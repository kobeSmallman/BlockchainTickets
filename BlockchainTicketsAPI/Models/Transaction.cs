using System;

namespace BlockchainTicketsAPI.Models
{
    public class Transaction
    {
        public int transactionid { get; set; }
        public string transactiontype { get; set; } = string.Empty;
        public DateTime createdat { get; set; }
        public DateTime updatedat { get; set; }
    }
}
