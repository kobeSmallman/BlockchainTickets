using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace BlockchainTicketsAPI.Services
{
    public class AuthenticationService
    {
        private readonly FirebaseApp _firebaseApp;

        public AuthenticationService(IConfiguration configuration)
        {
            var firebaseProjectId = configuration["Firebase:ProjectId"];
            _firebaseApp = FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile(configuration["Firebase:CredentialPath"]),
                ProjectId = firebaseProjectId
            });
        }

        public async Task<FirebaseToken> VerifyTokenAsync(string idToken)
        {
            FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);
            return decodedToken;
        }

        public async Task<UserRecord> GetUserByIdAsync(string uid)
        {
            return await FirebaseAuth.DefaultInstance.GetUserAsync(uid);
        }

        public async Task<UserRecord> CreateUserAsync(string email, string password)
        {
            var user = new UserRecordArgs
            {
                Email = email,
                EmailVerified = false,
                Password = password,
                Disabled = false,
            };
            return await FirebaseAuth.DefaultInstance.CreateUserAsync(user);
        }
    }
}
