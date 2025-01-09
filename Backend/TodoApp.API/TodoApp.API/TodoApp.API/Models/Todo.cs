using System.ComponentModel;

namespace TodoApp.API.Models
{
    public class Todo
    {
        public Guid id { get; set; }
        public int? idList { get; set; }
        public string name { get; set; }
        [DefaultValue(false)]
        public bool done { get; set; }
        public int? priority { get; set; }
        
        [DefaultValue(false)]
        public bool isDeleted { get; set; }


        public Todo()
        {
            isDeleted = false;
        }
    }
}
