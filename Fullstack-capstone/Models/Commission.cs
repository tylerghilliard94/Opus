using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fullstack_capstone.Models
{
    public class Commission
    {

        public int Id { get; set; }

        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        public int ArtistId { get; set; }

        public UserProfile Artist { get; set; }

        public string Rate { get; set; }

        public string Message { get; set; }

        public int IsAccepted { get; set; }
    }
}
