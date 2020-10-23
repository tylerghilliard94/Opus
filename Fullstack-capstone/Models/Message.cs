using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Fullstack_capstone.Models
{
    public class Message
    {

        public int Id { get; set; }

        public int OpenMessengerId { get; set;}

        public OpenMessenger OpenMessenger { get; set; }

        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        public string Content { get; set; }

        public DateTime Time { get; set; }
    }
}
