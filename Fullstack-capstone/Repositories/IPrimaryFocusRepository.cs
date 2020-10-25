using Fullstack_capstone.Models;
using System.Collections.Generic;

namespace Fullstack_capstone.Repositories
{
    public interface IPrimaryFocusRepository
    {
        List<PrimaryFocus> GetAllPrimaryFoci();
        PrimaryFocus GetPrimaryFocus(int id);
    }
}