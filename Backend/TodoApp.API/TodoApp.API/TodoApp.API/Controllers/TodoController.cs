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

        [HttpGet]
        public async Task<IActionResult> GetAllTodos()
        {
            var todos = await _todoDbContext.Todos.ToListAsync();
            return Ok(todos);
        }

        [HttpPost("name, id, ")]
        public async Task<IActionResult> AddTodo(Todo todo)
        {
            todo.id = Guid.NewGuid();
            _todoDbContext.Todos.Add(todo);
            await _todoDbContext.SaveChangesAsync();
            return Ok(todo);
        }

        
        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> DeleteTodo([FromRoute] Guid id)
        {
            var todo = await _todoDbContext.Todos.FindAsync(id);
            
            if(todo == null)
                return NotFound();

            todo.isDeleted = true;

            await _todoDbContext.SaveChangesAsync();
            return Ok(todo);
            
        }

        
        
        [HttpPut("{id,done}")]

        public async Task<IActionResult> UpdateTodo([FromRoute] Guid id, Todo todoUpdateRequest)
        {
            var todo = await _todoDbContext.Todos.FindAsync(id);
            
            if(todo == null)
                return NotFound();

            todo.done = todoUpdateRequest.done;

            await _todoDbContext.SaveChangesAsync();

            return Ok(todo);
        }
    }
}
