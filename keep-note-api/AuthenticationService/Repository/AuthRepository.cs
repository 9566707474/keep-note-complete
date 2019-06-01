using AuthenticationService.Models;
using System.Linq;

namespace AuthenticationService.Repository
{
    public class AuthRepository : IAuthRepository
    {
        //Define a private variable to represent AuthDbContext
        private AuthDbContext authDbContext;

        public AuthRepository(AuthDbContext dbContext)
        {
            authDbContext = dbContext;
        }

        //This methos should be used to Create a new User
        public bool CreateUser(User user)
        {
            authDbContext.Set<User>().Add(user);
            authDbContext.SaveChanges();
            return true;
        }

        //This methos should be used to check the existence of user
        public bool IsUserExists(string userId)
        {
            var result = authDbContext.Set<User>().FirstOrDefault(p => p.UserId == userId);
            if (result == null)
            {
                return false;
            }

            return true;
        }

        //This methos should be used to Login a user
        public bool LoginUser(User user)
        {
            var result = authDbContext.Set<User>().FirstOrDefault(p => p.UserId == user.UserId && p.Password == user.Password);
            if (result == null)
            {
                return false;
            }

            return true;
        }
    }
}
