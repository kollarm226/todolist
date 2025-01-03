using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.API.Data;
namespace TodoApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListsController : ControllerBase
    {
        private readonly TodoDbContext _dbContext;


        public ListsController(TodoDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet]
        public async Task<IActionResult> GetLists()
        {

            var lists = await _dbContext.Lists.ToListAsync();
            return Ok(lists);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetPost(int id)
        {

            var list = await _dbContext.Lists.FindAsync(id);


            if (list == null)
            {
                return NotFound($"List with ID = {id} not found.");
            }


            return Ok(list);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllLists(int page = 1, int pageSize = 10)
        {
            var totalItems = await _dbContext.Lists.CountAsync();
            var lists = await _dbContext.Lists
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
    
            return Ok(new { TotalItems = totalItems, Lists = lists });
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteList(int id)
        {
            var list = await _dbContext.Lists.FindAsync(id);

            if (list == null)
            {
                return NotFound(new { Message = $"List with ID = {id} not found." });
            }

            _dbContext.Lists.Remove(list);
            await _dbContext.SaveChangesAsync();

            return Ok(new { Message = $"List with ID = {id} has been deleted successfully." });
        }
    }
}