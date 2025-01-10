using System.ComponentModel;

namespace TodoApp.API.Models
{
    public class Todo
    {
        public Guid id { get; set; }
        public int? idList { get; set; }
        public string name { get; set; }
        [DefaultValue(false)]
        public bool isDone { get; set; }
        public int? priority { get; set; }
        
        [DefaultValue(false)]
        public bool isDeleted { get; set; }


        // public Todo()
        // {
        //     isDeleted = false;               // This sets the default value of "isDeleted" to false.
        //      isDone = false;                 // This sets the default value of "isDone" to false.
        //
        // }
    }
}
