using Fullstack_capstone.Models;
using System.Collections.Generic;

namespace Fullstack_capstone.Repositories
{
    public interface IFavoritesRepository
    {
        void Add(Favorite favorite);
        void DeleteFavorite(int id);
        List<Favorite> GetAllFavorites(int id);
       
    }
}