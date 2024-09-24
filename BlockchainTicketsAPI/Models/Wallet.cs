using System;

namespace BlockchainTicketsAPI.Models
{
    public class Wallet
    {
        public int walletid { get; set; }
        public string walletaddress { get; set; } = string.Empty;
        public DateTime createdat { get; set; }
        public DateTime updatedat { get; set; }
    }
}
