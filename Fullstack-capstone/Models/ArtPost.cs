using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace Fullstack_capstone.Models
{
    public class ArtPost
    {
        public int Id { get; set; }

        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        public string Image { get; set; }

        public string Title { get; set; }

        public DateTime PostDate { get; set; }

        public string Description { get; set; }

        public int CategoryId { get; set; }

        public Category Category { get; set; }

        public int ArtTypeId { get; set; }

        public ArtType ArtType { get; set; }

        public int IsDelete { get; set; }
    }
}
