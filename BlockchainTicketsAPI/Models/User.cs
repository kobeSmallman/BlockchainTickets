using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlockchainTicketsAPI.Models
{
    public class User
    {
        [Key]
        public int userid { get; set; }
        public string firebaseuid { get; set; } = string.Empty;
        public string username { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public string passwordhash { get; set; } = string.Empty;
        public int roleid { get; set; }
        public DateTime createdat { get; set; }
        public DateTime updatedat { get; set; }
    }
}
