using Microsoft.AspNetCore.Mvc;
using BlockchainTicketsAPI.Services;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AuthenticationService _authService;

    public UsersController(AuthenticationService authService)
    {
        _authService = authService;
    }

    [HttpPost("verifyToken")]
    public async Task<IActionResult> VerifyToken([FromBody] string idToken)
    {
        var decodedToken = await _authService.VerifyTokenAsync(idToken);
        return Ok(decodedToken);
    }

    [HttpPost("createUser")]
    public async Task<IActionResult> CreateUser([FromBody] UserCreationRequest request)
    {
        var user = await _authService.CreateUserAsync(request.Email, request.Password);
        return Ok(user);
    }
}

public class UserCreationRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
}
