using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;

namespace NoteService.Models
{
    public class NoteContext : INoteContext
    {
        //declare variables to connect to MongoDB database
        private readonly IMongoDatabase database;
        private MongoClient client;

        public NoteContext(IConfiguration configuration)
        {
            var connectionString = Environment.GetEnvironmentVariable("Mongo_DB");
            if (connectionString == null)
            {
                connectionString = configuration.GetSection("MongoDB:ConnectionString").Value;
            }

            //Initialize MongoClient and Database using connection string and database name from configuration
            client = new MongoClient(connectionString);
            database = client.GetDatabase(configuration.GetSection("MongoDB:NoteDatabase").Value);
        }

        //Define a MongoCollection to represent the Notes collection of MongoDB based on NoteUser type
        public IMongoCollection<NoteUser> Notes => database.GetCollection<NoteUser>("NoteUser");
    }
}
