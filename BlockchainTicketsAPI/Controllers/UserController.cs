using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BlockchainTicketsAPI.Services;
using BlockchainTicketsAPI.Dtos;
using BlockchainTicketsAPI.Models;
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

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] UserDto userDto)
        {
            try
            {
                // Create user in Firebase
                var userRecord = await _authService.CreateUserAsync(userDto.Email, userDto.PasswordHash);

                // Save additional user info to your database
                var newUser = new User
                {
                    UserId = userRecord.Uid,
                    Username = userDto.Username,
                    Email = userDto.Email,
                    PasswordHash = userDto.PasswordHash,
                    Role = userDto.Role,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                // TODO: Add logic to save the newUser to your database

                return Ok(newUser);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("getEmailByUsername/{username}")]
        public async Task<IActionResult> GetEmailByUsername(string username)
        {
            try
            {
                // TODO: Replace with actual database call to get user by username
                var user = new User
                {
                    Email = "example@example.com"
                };

                if (user == null)
                {
                    return NotFound();
                }

                return Ok(new { email = user.Email });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
