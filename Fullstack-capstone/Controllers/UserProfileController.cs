using Microsoft.AspNetCore.Mvc;
using System;
using Fullstack_capstone.Models;
using Fullstack_capstone.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace Fullstack_capstone.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

       

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
           
          
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        //Get All Users
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAllUserProfiles());
        }

        //Get User by User.Id
        [HttpGet("details/{id}")]
        public IActionResult GetUserProfileById(int id)
        {
            return Ok(_userProfileRepository.GetUserProfileById(id));
        }

       
       
    }
}
