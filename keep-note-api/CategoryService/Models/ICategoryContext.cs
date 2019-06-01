using MongoDB.Driver;

namespace CategoryService.Models
{
    public interface ICategoryContext
    {
        IMongoCollection<Category> Categories { get; }
    }
}
