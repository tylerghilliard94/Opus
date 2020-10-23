using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fullstack_capstone.Models
{
    public class OpenMessenger
    {
        public int id { get; set; }

        public int UserOneId { get; set; }

        public UserProfile UserOne { get; set; }

        public int UserTwoId { get; set; }

        public UserProfile UserTwo { get; set; }

        public int IsDeleted { get; set; }
    }
}
