namespace BlockchainTicketsAPI.Dtos
{
    public class UserDto
    {
        public string uid { get; set; } = string.Empty;
        public string username { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public string passwordhash { get; set; } = string.Empty;
        public int roleid { get; set; }
    }
}
