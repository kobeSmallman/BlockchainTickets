using System;

namespace BlockchainTicketsAPI.Models
{
    public class RolePermission
    {
        public int rolepermissionid { get; set; }
        public int roleid { get; set; }
        public int permissionid { get; set; }
        public DateTime createdat { get; set; }
        public DateTime updatedat { get; set; }
    }
}
