namespace BlockchainTicketsAPI.Dtos
{
    public class UserDto
    {
        public string Uid { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string PasswordHash { get; set; }
    }
}
