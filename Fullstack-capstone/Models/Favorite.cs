using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fullstack_capstone.Models
{
    public class Favorite
    {

        public int Id { get; set; }

        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        public int PostId { get; set; }

        public ArtPost ArtPsot { get; set; }
    }
}
