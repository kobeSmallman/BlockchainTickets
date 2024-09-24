using System;

namespace BlockchainTicketsAPI.Models
{
    public class Permission
    {
        public int permissionid { get; set; }
        public string permissionname { get; set; } = string.Empty;
        public DateTime createdat { get; set; }
        public DateTime updatedat { get; set; }
    }
}
