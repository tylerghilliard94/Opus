using Fullstack_capstone.Models;
using System.Collections.Generic;

namespace Fullstack_capstone.Repositories
{
    public interface ICategoriesRepository
    {
        List<Category> GetAllCategories();
        Category GetCategory(int id);
    }
}