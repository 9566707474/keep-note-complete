using MongoDB.Driver;
using ReminderService.Models;
using System.Collections.Generic;
using System.Linq;

namespace ReminderService.Repository
{
    public class ReminderRepository : IReminderRepository
    {
        private IReminderContext context;

        public ReminderRepository(IReminderContext context)
        {
            this.context = context;
        }

        public Reminder CreateReminder(Reminder reminder)
        {
            context.Reminders.InsertOne(reminder);
            return reminder;
        }

        public bool DeleteReminder(int reminderId)
        {
            var result = context.Reminders.DeleteOne(Builders<Reminder>.Filter.Eq("Id", reminderId));

            return result.IsAcknowledged && result.DeletedCount > 0;
        }

        public List<Reminder> GetAllReminders()
        {
            return context.Reminders.Find(p => true).ToList();
        }

        public List<Reminder> GetAllRemindersByUserId(string userId)
        {
            return context.Reminders.Find(p => p.CreatedBy == userId).ToList();
        }

        public Reminder GetReminderById(int reminderId)
        {
            return context.Reminders.Find(p => p.Id == reminderId).FirstOrDefault();
        }

        public bool UpdateReminder(int reminderId, Reminder reminder)
        {
            var filter = Builders<Reminder>.Filter.Eq("Id", reminderId);
            var result = context.Reminders.ReplaceOne(filter, reminder);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }
    }
}
