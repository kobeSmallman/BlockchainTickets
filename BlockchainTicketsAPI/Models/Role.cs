using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlockchainTicketsAPI.Models
{
    public class Role
    {
        [Key]
        public int roleid { get; set; }
        public string rolename { get; set; } = string.Empty;
        public DateTime createdat { get; set; }
        public DateTime updatedat { get; set; }
    }
}
