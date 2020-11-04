using Fullstack_capstone.Models;
using System.Collections.Generic;

namespace Fullstack_capstone.Repositories
{
    public interface IFollowingRepository
    {
        void Add(Following follow);
        void DeleteFollow(int id);
        List<Following> GetAllFollows(int id);
    }
}