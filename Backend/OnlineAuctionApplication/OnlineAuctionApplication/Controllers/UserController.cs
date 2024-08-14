using BusinessLayer.Interface;
using BusinessObjectLayer;
using OnlineAuctionApplication.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace OnlineAuctionApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserBL _userBL;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserBL userBL, ILogger<UserController> logger)
        {
            _userBL = userBL;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLogin login)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var validUser = await _userBL.AuthenticateAsync(login.Email, login.Password);
                    if (validUser != null)
                    {
                        if (!validUser.IsAdmin)
                        {
                            return Ok(validUser);
                        }
                        return Unauthorized(new { message = "Admin cannot log in as a customer." });
                    }
                    else
                    {
                        return Unauthorized(new { message = "Invalid email or password." });
                    }
                }
                return BadRequest(new { message = "Invalid model state." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred during login.");
                return StatusCode(500, new { message = "An unexpected error occurred.", detail = ex.Message });
            }
        }

        [HttpPost("Admin-Login")]
        public async Task<IActionResult> CheckAdmin([FromBody] UserLogin login)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var isAdmin = await _userBL.IsAdminAsync(login.Email, login.Password);
                    if (isAdmin != null)
                    {
                        return Ok(isAdmin);
                    }
                    return Ok(new { message = "User is not an admin." });
                }
                return BadRequest(new { message = "Invalid model state." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking admin status for email {email}", login.Email);
                return StatusCode(500, new { message = "An unexpected error occurred.", detail = ex.Message });
            }
        }

        [HttpGet("GetUserById/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            try
            {
                var user = await _userBL.GetUserByIdAsync(id);
                if (user == null)
                {
                    return NotFound();
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching user with id {id}", id);
                return StatusCode(500, new { message = "An unexpected error occurred.", detail = ex.Message });
            }
        }

        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userBL.GetAllUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching all users.");
                return StatusCode(500, new { message = "An unexpected error occurred.", detail = ex.Message });
            }
        }
    }
}
