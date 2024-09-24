using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BlockchainTicketsAPI.Services;
using BlockchainTicketsAPI.Dtos;
using BlockchainTicketsAPI.Models;
using BlockchainTicketsAPI.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;

namespace BlockchainTicketsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AuthenticationService _authService;
        private readonly ApplicationDbContext _dbContext;
        private readonly ILogger<UserController> _logger;

        public UserController(AuthenticationService authService, ApplicationDbContext dbContext, ILogger<UserController> logger)
        {
            _authService = authService ?? throw new ArgumentNullException(nameof(authService));
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpPost("create-admin")]
        public async Task<IActionResult> CreateAdmin([FromBody] UserDto userDto)
        {
            return await CreateUser(userDto, 1); // Assuming Admin RoleId is 1
        }

        [HttpPost("create-eventmanager")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateEventManager([FromBody] UserDto userDto)
        {
            return await CreateUser(userDto, 2); // Assuming Event Manager RoleId is 2
        }

        [HttpPost("create-regularuser")]
        public async Task<IActionResult> CreateRegularUser([FromBody] UserDto userDto)
        {
            return await CreateUser(userDto, 3); // Assuming Regular User RoleId is 3
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (loginDto == null)
            {
                _logger.LogWarning("Login attempt failed: LoginDto is null");
                return BadRequest(new { message = "LoginDto is null" });
            }

            try
            {
                _logger.LogInformation("Received ID Token: {IdToken}", loginDto.IdToken);

                var userRecord = await _authService.VerifyTokenAsync(loginDto.IdToken);
                var user = await _dbContext.users.FirstOrDefaultAsync(u => u.firebaseuid == userRecord.Uid);

                if (user == null)
                {
                    _logger.LogWarning("User not found for UID: {Uid}", userRecord.Uid);
                    return BadRequest(new { message = "User not found" });
                }

                _logger.LogInformation("Found user: {Email} with RoleId: {RoleId}", user.email, user.roleid);

                var role = await _dbContext.roles.FirstOrDefaultAsync(r => r.roleid == user.roleid);
                if (role == null)
                {
                    _logger.LogWarning("Role not found for RoleId: {RoleId}", user.roleid);
                    return NotFound(new { message = "Role not found" });
                }

                _logger.LogInformation("Role {RoleName} found for user {Email}", role.rolename, user.email);
                return Ok(new { roleid = user.roleid });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during login: {Message}", ex.Message);
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("getRole")]
        [Authorize]
        public async Task<IActionResult> GetRole([FromBody] EmailDto emailDto)
        {
            _logger.LogInformation("Entering GetRole method");
            if (emailDto == null)
            {
                _logger.LogWarning("EmailDto is null");
                return BadRequest(new { message = "EmailDto is null" });
            }

            var user = await _dbContext.users.FirstOrDefaultAsync(u => u.email == emailDto.email);
            if (user == null)
            {
                _logger.LogWarning("User not found for email: {Email}", emailDto.email);
                return NotFound(new { message = "User not found" });
            }

            var role = await _dbContext.roles.FirstOrDefaultAsync(r => r.roleid == user.roleid);
            if (role == null)
            {
                _logger.LogWarning("Role not found for RoleId: {RoleId}", user.roleid);
                return NotFound(new { message = "Role not found" });
            }

            _logger.LogInformation("Role {RoleName} found for user {Email}", role.rolename, user.email);
            return Ok(new { role = role.rolename });
        }

        private async Task<IActionResult> CreateUser(UserDto userDto, int roleId)
        {
            if (userDto == null)
            {
                return BadRequest(new { message = "UserDto is null" });
            }

            try
            {
                var userRecord = await _authService.GetUserByIdAsync(userDto.uid);
                if (userRecord == null)
                {
                    userRecord = await _authService.CreateUserAsync(userDto.email, userDto.passwordhash);
                }

                var existingUser = await _dbContext.users.FirstOrDefaultAsync(u => u.email == userDto.email);
                if (existingUser != null)
                {
                    return BadRequest(new { message = "The user with the provided email already exists." });
                }

                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(userDto.passwordhash);

                var newUser = new User
                {
                    firebaseuid = userRecord.Uid,
                    username = userDto.username,
                    email = userDto.email,
                    passwordhash = hashedPassword,
                    roleid = roleId,
                    createdat = DateTime.UtcNow,
                    updatedat = DateTime.UtcNow
                };

                _dbContext.users.Add(newUser);
                await _dbContext.SaveChangesAsync();

                _logger.LogInformation("User created successfully with email: {Email}", userDto.email);
                return Ok(newUser);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during user creation");
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
