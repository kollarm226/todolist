using Microsoft.AspNetCore.Http;
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
        public async Task<IActionResult> GetAllNotDeletedTodos()                                           
        {
           
            var todos = await _todoDbContext.Todos.Where(todo => !todo.isDeleted).ToListAsync();
            
            return Ok(todos);
        }
        
        // Method that returns all tasks that are deleted.
        [HttpGet("deleted")]
        public async Task<IActionResult> GetAllDeletedTodos()                                              
        {
            try
            {
                if (!await AreThereAnyTodosAsync())
                {
                    return NotFound("No tasks found in the database.");
                }
            
                var todos = await _todoDbContext.Todos.Where(todo => todo.isDeleted).ToListAsync();
                return Ok(todos);  
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please contact support.");
            }
        }
        
        // Method that returns all tasks. 
        [HttpGet("all")]
        public async Task<IActionResult> GetAllTodos()                                                          
        {
            try
            {
                if (!await AreThereAnyTodosAsync())
                {
                    return NotFound("No tasks found in the database.");
                }

                var todos = await _todoDbContext.Todos.ToListAsync();
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
        
        // Method that can toggle parameter "isDone". When it is false it toggle it to true and when is true it toggle it to false.
        // Insert parameter is task's ID.
        [HttpPut("done/{id}/{done}")]
        public async Task<IActionResult> ChangeDoneTodo([FromRoute] Guid id, Todo todoUpdateRequest)                
        {
            try
            {
                var todo = await _todoDbContext.Todos.FindAsync(id);

                if (todo == null)
                    return NotFound();

                todo.isDone = !todo.isDone;

                await _todoDbContext.SaveChangesAsync();

                return Ok(todo);
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
