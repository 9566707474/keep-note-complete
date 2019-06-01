using System;
using System.Collections.Generic;
using CategoryService.Models;
using CategoryService.Repository;
using CategoryService.Exceptions;

namespace CategoryService.Service
{
    public class CategoryService:ICategoryService
    {
        private ICategoryRepository categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }

        public Category CreateCategory(Category category)
        {
            try
            {
                var result = categoryRepository.CreateCategory(category);
                if (result == null)
                {
                    throw new CategoryNotCreatedException("This category already exists");
                }

                return result;
            }
            catch (CategoryNotCreatedException)
            {
                throw;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool DeleteCategory(int categoryId)
        {
            try
            {
                var result = categoryRepository.DeleteCategory(categoryId);
                if (!result)
                {
                    throw new CategoryNotFoundException("This category id not found");
                }

                return result;
            }
            catch (CategoryNotFoundException)
            {
                throw;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Category> GetAllCategoriesByUserId(string userId)
        {
            try
            {
                var result = categoryRepository.GetAllCategoriesByUserId(userId);
                if (result == null)
                {
                    throw new CategoryNotFoundException("This category id not found");
                }

                return result;
            }
            catch (CategoryNotFoundException)
            {
                throw;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Category GetCategoryById(int categoryId)
        {
            try
            {
                var result = categoryRepository.GetCategoryById(categoryId);
                if (result == null)
                {
                    throw new CategoryNotFoundException("This category id not found");
                }

                return result;
            }
            catch (CategoryNotFoundException)
            {
                throw;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool UpdateCategory(int categoryId, Category category)
        {
            try
            {
                var result = categoryRepository.UpdateCategory(categoryId, category);
                if (!result)
                {
                    throw new CategoryNotFoundException("This category id not found");
                }

                return result;
            }
            catch (CategoryNotFoundException)
            {
                throw;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
