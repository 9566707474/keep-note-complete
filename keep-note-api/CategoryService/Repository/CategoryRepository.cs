using System;
using System.Collections.Generic;
using System.Linq;
using CategoryService.Models;
using MongoDB.Driver;

namespace CategoryService.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private ICategoryContext context;

        public CategoryRepository(ICategoryContext context)
        {
            this.context = context;
        }

        public Category CreateCategory(Category category)
        {
            context.Categories.InsertOne(category);
            return category;
        }

        public bool DeleteCategory(int categoryId)
        {
            var result = context.Categories.DeleteOne(Builders<Category>.Filter.Eq("Id", categoryId));

            return result.IsAcknowledged && result.DeletedCount > 0;
        }

        public List<Category> GetAllCategoriesByUserId(string userId)
        {
            return context.Categories.Find(p => p.CreatedBy == userId).ToList();
        }

        public Category GetCategoryById(int categoryId)
        {
            return context.Categories.Find(p => p.Id == categoryId).FirstOrDefault();
        }

        public bool UpdateCategory(int categoryId, Category category)
        {
            var filter = Builders<Category>.Filter.Eq("Id", categoryId);
            var result = context.Categories.ReplaceOne(filter, category);
            return result.IsAcknowledged && result.MatchedCount > 0;
        }
    }
}
