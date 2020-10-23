using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace Fullstack_capstone.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }



        [Required]
        [MaxLength(50)]
        public string DisplayName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }
        [Required]
        public int PrimaryFocusId { get; set; }

        public PrimaryFocus PrimaryFocus { get; set; }


        [Required]
        [MaxLength(255)]
        public string Image { get; set; }

        [Required]
        public string Description { get; set; }
       
        

       [Required]
        [MaxLength(50)]
        public string FullName { get; set; }
    }
}