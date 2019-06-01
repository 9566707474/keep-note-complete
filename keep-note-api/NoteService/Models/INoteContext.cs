using MongoDB.Driver;

namespace NoteService.Models
{
    public interface INoteContext
    {
        IMongoCollection<NoteUser> Notes { get; }
    }
}
