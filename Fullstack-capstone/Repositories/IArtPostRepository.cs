using Fullstack_capstone.Models;
using System.Collections.Generic;

namespace Fullstack_capstone.Repositories
{
    public interface IArtPostRepository
    {
        void Add(ArtPost artPost);
        void DeleteArtPost(int id);
        List<ArtPost> GetAllArtPosts();
        List<ArtPost> GetAllArtPostsByUser(int userId);
        ArtPost GetArtPostById(int id);
        void UpdateArtPost(ArtPost artPost);
        public List<ArtPost> SearchArtPosts(int CategoryCriterion, int ArtTypeCriterion, bool latestSwitch, bool trendingSwitch);

        public void AddLike(int id, int likes);
        public void RemoveLike(int id, int likes);

    }
}