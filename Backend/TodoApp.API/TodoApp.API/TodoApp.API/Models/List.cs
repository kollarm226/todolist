namespace TodoApp.API.Models;

public class List
{
    public Guid id { get; set; }
    public Guid UserID { get; set; }
    public string list_name { get; set; }
    public int icon { get; set; }
    public int color { get; set; }
}