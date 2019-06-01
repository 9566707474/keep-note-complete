using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace NoteService.Models
{
    public class Note
    {
        /*
	 * This class should have seven properies
	 * (Id,Title,Content,CreationDate,
	 * Category,Reminders,CreatedBy). Out of these seven properties Id should
     * be annotated with [BsonId]. The value of CreationDate should not be
	 * accepted from the user but should be always initialized with the system date.
	 */
        [BsonId(IdGenerator = typeof(CounterIdGenerator))]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public Category Category { get; set; }
        public List<Reminder> Reminders { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreationDate { get; set; }
    }

    public class CounterIdGenerator : IIdGenerator
    {
        private static int _counter = 101;
        public object GenerateId(object container, object document)
        {
            return _counter = _counter + 1;
        }

        public bool IsEmpty(object id)
        {
            if (id.Equals(default(int)))
            {
                return true;
            }

            _counter = (int)id;
            return false;
        }
    }
}
