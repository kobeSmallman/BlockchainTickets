// UserController.cs
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BlockchainTicketsAPI.Services;
using System;

namespace BlockchainTicketsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AuthenticationService _authService;

        public UserController(AuthenticationService authService)
        {
            _authService = authService;
        }

        [HttpPost("verify")]
        public async Task<IActionResult> Verify([FromBody] string idToken)
        {
            try
            {
                var decodedToken = await _authService.VerifyTokenAsync(idToken);
                return Ok(decodedToken);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
