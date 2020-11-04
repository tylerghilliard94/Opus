using Microsoft.AspNetCore.Mvc;
using System;
using Fullstack_capstone.Models;
using Fullstack_capstone.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace Fullstack_capstone.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IArtPostRepository _artPostRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository, IArtPostRepository artPostRepository)
        {
            _userProfileRepository = userProfileRepository;
            _artPostRepository = artPostRepository;
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

        [HttpPut]
        public IActionResult EditUserProfile(UserProfile userProfile)
        {
            _userProfileRepository.UpdateUserProfile(userProfile);
            return Ok();
        }

        [HttpPut("delete/{id}")]
        public IActionResult DeleteUserProfileAndPosts(int id)
        {
           List<ArtPost> artPosts = _artPostRepository.GetAllArtPostsByUser(id);
            _userProfileRepository.DeleteUserProfile(id);
            foreach(ArtPost artPost in artPosts)
            {
                _artPostRepository.DeleteArtPost(artPost.Id);
            }
            return Ok();
        }
       
    }
}
