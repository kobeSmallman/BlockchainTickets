using System;

namespace BlockchainTicketsAPI.Models
{
    public class UserRole
    {
        public int userroleid { get; set; }
        public int userid { get; set; }
        public int roleid { get; set; }
        public DateTime createdat { get; set; }
        public DateTime updatedat { get; set; }
    }
}
