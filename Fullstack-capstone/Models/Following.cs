using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fullstack_capstone.Models
{
    public class Following
    {
        public int Id { get; set; }

        public int SubscriberId { get; set; }

        public UserProfile Subscriber { get; set; }

        public int SubscribedToId { get; set; }

        public UserProfile SubscribedTo { get; set; }


    }
}
