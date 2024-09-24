using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace BlockchainTicketsAPI.Services
{
    public class AuthenticationService
    {
        private readonly ILogger<AuthenticationService> _logger;

        public AuthenticationService(IConfiguration configuration, ILogger<AuthenticationService> logger)
        {
            _logger = logger;
            if (FirebaseApp.DefaultInstance == null)
            {
                var options = new AppOptions()
                {
                    Credential = GoogleCredential.FromFile(configuration.GetValue<string>("Firebase:CredentialPath")),
                    ProjectId = configuration.GetValue<string>("Firebase:ProjectId")
                };
                FirebaseApp.Create(options);
            }
        }

        public async Task<FirebaseToken> VerifyTokenAsync(string idToken)
        {
            try
            {
                _logger.LogInformation("Verifying token: {IdToken}", idToken);
                FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);
                _logger.LogInformation("Token verified successfully: {Uid}", decodedToken.Uid);
                return decodedToken;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Token verification failed: {Message}", ex.Message);
                throw;
            }
        }

        public async Task<UserRecord> GetUserByIdAsync(string uid)
        {
            return await FirebaseAuth.DefaultInstance.GetUserAsync(uid);
        }

        public async Task<UserRecord> CreateUserAsync(string email, string password)
        {
            try
            {
                return await FirebaseAuth.DefaultInstance.CreateUserAsync(new UserRecordArgs
                {
                    Email = email,
                    EmailVerified = false,
                    Password = password,
                    Disabled = false,
                });
            }
            catch (FirebaseAuthException ex) when (ex.AuthErrorCode == AuthErrorCode.EmailAlreadyExists)
            {
                throw new Exception("The user with the provided email already exists.");
            }
        }
    }
}
