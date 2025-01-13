using Microsoft.EntityFrameworkCore;
using TodoApp.API.Models;

namespace TodoApp.API.Data
{
    public class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Todo> Todos { get; set; }
        public DbSet<List> Lists { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Todo>().Property(t => t.isDone).HasDefaultValue(false);                         
            modelBuilder.Entity<Todo>().Property(t => t.isDeleted).HasDefaultValue(false);  
            modelBuilder.Entity<Todo>().Property(t => t.isDeleted).HasColumnName("isDeleted");
            modelBuilder.Entity<Todo>().Property(t => t.isDone).HasColumnName("isDone");
        }
    }
}
