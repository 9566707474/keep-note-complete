using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;

namespace CategoryService.Models
{
    public class CategoryContext : ICategoryContext
    {
        //declare variable to connect to MongoDB database
        private readonly IMongoDatabase database;
        MongoClient client;

        public CategoryContext(IConfiguration configuration)
        {
            var connectionString = Environment.GetEnvironmentVariable("Mongo_DB");
            if (connectionString == null)
            {
                connectionString = configuration.GetSection("MongoDB:ConnectionString").Value;
            }

            //Initialize MongoClient and Database using connection string and database name from configuration
            client = new MongoClient(connectionString);
            database = client.GetDatabase(configuration.GetSection("MongoDB:CategoryDatabase").Value);
        }

        //Define a MongoCollection to represent the Categories collection of MongoDB

        public IMongoCollection<Category> Categories => database.GetCollection<Category>("Category");
    }
}
