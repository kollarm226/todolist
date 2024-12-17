using Microsoft.EntityFrameworkCore;
using TodoApp.API.Data;
using System; 
using MySql.Data.MySqlClient; 
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var builder1 = new ConfigurationBuilder().SetBasePath(AppContext.BaseDirectory).AddJsonFile("appsettings.json", optional: false, reloadOnChange: true); 
IConfiguration configuration = builder1.Build(); 
string connectionString = configuration.GetConnectionString("TodoDbConnectionString");
using (MySqlConnection conn = new MySqlConnection(connectionString))
{
    try
    {
        conn.Open();
        Console.WriteLine("Connection successful!");
        string sql = "SELECT * FROM users";
        MySqlCommand cmd = new MySqlCommand(sql, conn);
        MySqlDataReader rdr = cmd.ExecuteReader();
        
        while (rdr.Read()) { 
            Console.WriteLine($"{rdr[0]} -- {rdr[1]}");
            
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.ToString());
    }

}






builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<TodoDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("TodoDbConnectionString")));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
