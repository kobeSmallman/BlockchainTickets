namespace BlockchainTicketsAPI.Controllers
{
    using BlockchainTicketsAPI.Services;
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;

    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AuthenticationService _authenticationService;

        public UserController(AuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateUser(string email, string password)
        {
            var userRecord = await _authenticationService.CreateUserAsync(email, password);
            return Ok(userRecord);
        }

        [HttpPost("verifyToken")]
        public async Task<IActionResult> VerifyToken(string idToken)
        {
            var decodedToken = await _authenticationService.VerifyTokenAsync(idToken);
            return Ok(decodedToken);
        }

        [HttpGet("{uid}")]
        public async Task<IActionResult> GetUserById(string uid)
        {
            var userRecord = await _authenticationService.GetUserByIdAsync(uid);
            return Ok(userRecord);
        }
    }
}
