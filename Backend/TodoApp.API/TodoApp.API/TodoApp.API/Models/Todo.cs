using System.ComponentModel;

namespace TodoApp.API.Models
{
    public class Todo
    {
        public Guid id { get; set; }
        public Guid ListID { get; set; }
        public string name { get; set; }
        [DefaultValue(false)]
        public bool isDone { get; set; }
        public int priority { get; set; }
        public List List { get; set; }
        [DefaultValue(false)]
        public bool isDeleted { get; set; }
        
    }
}
