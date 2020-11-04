using Fullstack_capstone.Models;
using System.Collections.Generic;

namespace Fullstack_capstone.Repositories
{
    public interface IArtTypeRepository
    {
        List<ArtType> GetAllArtTypes();
        ArtType GetArtType(int id);
    }
}