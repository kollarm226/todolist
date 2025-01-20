using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.API.Data;
using TodoApp.API.Models;

namespace TodoApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoDbContext _todoDbContext;

        public TodoController(TodoDbContext todoDbContext)
        {
            _todoDbContext = todoDbContext;
        }

        // Method that returns all tasks that are NOT deleted.
        [HttpGet("notdeleted")]
public async Task<IActionResult> GetAllNotDeletedTodos([FromQuery] Guid listId)                                           
{
   
    var todos = await _todoDbContext.Todos.Where(todo => todo.ListID == listId && !todo.isDeleted).ToListAsync();
    
    return Ok(todos);
        }
        
        // Method that returns all tasks that are deleted.
        [HttpGet("deleted")]
public async Task<IActionResult> GetAllDeletedTodos([FromQuery] Guid listId)                                              
{
    try
    {
        if (!await AreThereAnyTodosAsync())
        {
            return NotFound("No tasks found in the database.");
        }
        var todos = await _todoDbContext.Todos.Where(todo => todo.ListID == listId && todo.isDeleted).ToListAsync();
        return Ok(todos);  
    }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please contact support.");
            }
        }
        
        // Method that returns all tasks from one list based on ListID. 
[HttpGet("all/{listId}")]
public async Task<IActionResult> GetAllTodos([FromRoute] Guid listId)                                                          
{
    try
    {
        var todos = await _todoDbContext.Todos.Where(todo => todo.ListID == listId).ToListAsync();
        
        if (!todos.Any())
        {
            return NotFound($"No tasks found for the ListID: {listId}.");
        }

        return Ok(todos);
    }
   
    catch (Exception ex)
    {
        return StatusCode(500, "Internal server error. Please contact support.");
    }
}
        
        // Method that add new task. It generates new ID for that task.
        [HttpPost("post")]
    public async Task<IActionResult> AddTodo(Todo todo)                                                    
        {
            try
            {
                todo.id = Guid.NewGuid();
                _todoDbContext.Todos.Add(todo);
                await _todoDbContext.SaveChangesAsync();
                return Ok(todo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please contact support.");
            }
        }
        
        // Method that set value "isDeleted" on true. Insert parameter is task's ID. 
        [HttpDelete("delete/{id:Guid}")]
        public async Task<IActionResult> DeleteTodo([FromRoute] Guid id)                                        
        {
            try
            {
                var todo = await _todoDbContext.Todos.FindAsync(id);

                if (todo == null)
                    return NotFound();

                todo.isDeleted = true;

                await _todoDbContext.SaveChangesAsync();
                return Ok(todo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please contact support.");
            }

        }

        // Method that can toggle parameter "isDeleted". When it is false it toggle it to true and when is true it toggle it to false.
        // Insert parameter is task's ID.
        [HttpPut("changeDeleted/{id:Guid}")]
        public async Task<IActionResult> ChangeIsDeleted([FromRoute] Guid id)                                      
        {
            try
            {
                var todo = await _todoDbContext.Todos.FindAsync(id);

                if (todo == null)
                    return NotFound(new { message = $"Todo with ID {id} not found." });

                todo.isDeleted = !todo.isDeleted;

                await _todoDbContext.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please contact support.");
            }
        }
        
        // Method that toggles the isDone status for a task by ID
        [HttpPut("done/{id}")]
        public async Task<IActionResult> ChangeDoneTodo([FromRoute] Guid id)
        {
            try
            {
                var todo = await _todoDbContext.Todos.FindAsync(id);

                if (todo == null)
                    return NotFound();

                // Toggle the isDone status
                todo.isDone = !todo.isDone;

                await _todoDbContext.SaveChangesAsync();

                return Ok(todo);  // Return the updated task
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please contact support.");
            }
        }

        
        
        // Helper method for better readability and reuse.
        private async Task<bool> AreThereAnyTodosAsync()
        {
            return await _todoDbContext.Todos.AnyAsync();
        }
    }
}
