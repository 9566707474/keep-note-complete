using System;
using System.Linq;
using MongoDB.Driver;
using UserService.Models;

namespace UserService.Repository
{
    public class UserRepository:IUserRepository
    {
        private IUserContext context;

        public UserRepository(IUserContext context)
        {
            this.context = context;
        }

        public bool DeleteUser(string userId)
        {
            var user = context.Users.Find(p => p.UserId == userId).FirstOrDefault();
            if (user == null)
            {
                return false;
            }

            var result = context.Users.DeleteOne(Builders<User>.Filter.Eq("UserId", userId));

            return result.IsAcknowledged && result.DeletedCount > 0;

        }

        public User GetUserById(string userId)
        {
            return context.Users.Find(p => p.UserId == userId).FirstOrDefault();
        }

        public User RegisterUser(User user)
        {
            try
            {
                context.Users.InsertOne(user);
                return user;
            }
            catch (Exception)
            {
                return null;
            }
           
        }

        public bool UpdateUser(string userId, User user)
        {
            var filter = Builders<User>.Filter.Eq("UserId", userId);
            var result = context.Users.ReplaceOne(filter, user);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }
    }
}
