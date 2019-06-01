using MongoDB.Driver;

namespace UserService.Models
{
    public interface IUserContext
    {
        IMongoCollection<User> Users { get; }
    }
}
