using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;

namespace UserService.Models
{
    public class UserContext : IUserContext
    {
        private readonly IMongoDatabase database;
        private MongoClient client;
        public UserContext(IConfiguration configuration)
        {
            var connectionString = Environment.GetEnvironmentVariable("Mongo_DB");
            if (connectionString == null)
            {
                connectionString = configuration.GetSection("MongoDB:ConnectionString").Value;
            }

            client = new MongoClient(connectionString);
            database = client.GetDatabase(configuration.GetSection("MongoDB:UserDatabase").Value);
        }

        public IMongoCollection<User> Users => database.GetCollection<User>("Users");
    }
}
