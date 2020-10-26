using Fullstack_capstone.Models;

namespace Fullstack_capstone.Repositories
{
    public interface ILikesRepository
    {
        void Add(Likes like);
        void DeleteLike(int id);
        public Likes GetAllLikesByUser(int userId, int postId);


    }
}