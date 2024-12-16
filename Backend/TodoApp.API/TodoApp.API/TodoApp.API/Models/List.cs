namespace TodoApp.API.Models;

public class List
{
    public Guid Id { get; set; }
    public int id_user { get; set; }
    public string list_name { get; set; }
    public int icon { get; set; }
    public int color { get; set; }
}