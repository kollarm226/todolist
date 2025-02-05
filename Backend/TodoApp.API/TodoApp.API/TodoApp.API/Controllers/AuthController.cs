﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TodoApp.API.Data;
using TodoApp.API.Models;
using TodoApp.API.Resources;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;

namespace TodoApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly TodoDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public AuthController(TodoDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (await _dbContext.Users.AnyAsync(x => x.email == user.email))
            {
                return BadRequest("Email already exists");
            }

            if (!IsValidEmail(user.email))
            {
                return BadRequest("Invalid email format");
            }
            
            if (!IsValidPassword(user.password))
            {
                return BadRequest("Password must be at least 8 characters long and contain a mix of " +
                                            "uppercase, lowercase, numbers, and special characters.");
            }

            user.id = Guid.NewGuid();
            user.password = PasswordHasher.HashPassword(user.password);
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            
            return Ok("Registration successful");
        }

        private bool IsValidPassword(string password)
        {
            var passwordPattern = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$";
            return Regex.IsMatch(password, passwordPattern);
        }

        private bool IsValidEmail(string email)
        {
            var emailPattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
            return Regex.IsMatch(email, emailPattern);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] User loginRequest)
        {
            try
            {
                var user = await _dbContext.Users.AsNoTracking().FirstOrDefaultAsync(x => x.email == loginRequest.email);
                if (user == null || !PasswordHasher.VerifyPassword(loginRequest.password, user.password))
                {
                    return Unauthorized("Invalid email or password");
                }

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.name),
                    new Claim(JwtRegisteredClaimNames.Email, user.email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var jwtSecret = _configuration["JWTSettings:Secret"];
                if (string.IsNullOrEmpty(jwtSecret))
                {
                    throw new InvalidOperationException("JWT Secret is not configured properly.");
                }

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret));
                var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    issuer: _configuration["JWTSettings:Issuer"],
                    audience: _configuration["JWTSettings:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: credentials
                );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    user = new
                    {
                        id = user.id,
                        name = user.name,
                        email = user.email
                    }
                });
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, "Internal server error. Please contact support.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occured. Please contact support.");
            }
        }
    }
}
