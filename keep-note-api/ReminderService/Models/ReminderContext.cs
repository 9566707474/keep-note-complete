using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;

namespace ReminderService.Models
{
    public class ReminderContext : IReminderContext
    {
        private readonly IMongoDatabase database;
        MongoClient client;

        public ReminderContext(IConfiguration configuration)
        {
            var connectionString = Environment.GetEnvironmentVariable("Mongo_DB");
            if (connectionString == null)
            {
                connectionString = configuration.GetSection("MongoDB:ConnectionString").Value;
            }

            client = new MongoClient(connectionString);
            database = client.GetDatabase(configuration.GetSection("MongoDB:ReminderDatabase").Value);
        }

        public IMongoCollection<Reminder> Reminders => database.GetCollection<Reminder>("Reminders");
    }
}

