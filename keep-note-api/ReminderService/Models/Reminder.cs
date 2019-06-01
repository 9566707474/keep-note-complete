using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace ReminderService.Models
{
    public class Reminder
    {
        /*
	 * This class should have six properties
	 * (Id,Name,Description,Type,
	 * CreatedBy,CreationDate). Out of these six fields, the field
	 * Id should be annotated with [BsonId].The value of CreationDate should not
	 * be accepted from the user but should be always initialized with the system
	 * date.
	 */
        [BsonId(IdGenerator = typeof(CounterIdGenerator))]
        public int Id { get; set; }
        public string Name { get; set; }
        public string CreatedBy { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public string Type { get; set; }
    }

    public class CounterIdGenerator : IIdGenerator
    {
        private static int _counter = 201;
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
