namespace TodoApp.API.Models
{
    public class Todo
    {
        public Guid id { get; set; }
        public int idList { get; set; }
        public string name { get; set; }
        public Boolean done { get; set; }
        public int priority { get; set; }
        // public Boolean isDeleted { get; set; }
    }
}
