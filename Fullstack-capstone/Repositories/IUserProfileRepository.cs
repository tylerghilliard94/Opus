using System.Collections.Generic;
using Fullstack_capstone.Models;

namespace Fullstack_capstone.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);

        List<UserProfile> GetAllUserProfiles();
        UserProfile GetUserProfileById(int id);
        public void UpdateUserProfile(UserProfile userProfile);

        public void DeleteUserProfile(int id);






    }
}