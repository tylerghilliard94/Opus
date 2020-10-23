using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fullstack_capstone.Models
{
    public class Notifications
    {
        public int Id { get; set; }

        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        public int EventOriginationId { get; set; }

        public UserProfile EventOrigination { get; set; }

        public int MessageTypeId { get; set; }

        public MessageType MessageType { get; set; }

        public string Message { get; set; }


    }
}
