using MongoDB.Driver;

namespace ReminderService.Models
{
    public interface IReminderContext
    {
        IMongoCollection<Reminder> Reminders { get; }
    }
}
