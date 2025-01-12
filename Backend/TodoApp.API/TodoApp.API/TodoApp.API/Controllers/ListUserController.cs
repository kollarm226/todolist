using Microsoft.AspNetCore.Mvc;
using TodoApp.API.Data;

namespace TodoApp.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ListUserController
{
    private readonly TodoDbContext _dbContext;
    
}