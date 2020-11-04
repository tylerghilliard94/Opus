using Microsoft.AspNetCore.Mvc;
using System;
using Fullstack_capstone.Models;
using Fullstack_capstone.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace Fullstack_capstone.Controllers
{
 
    [Route("api/[controller]")]
    [ApiController]
    public class LikesController : ControllerBase
    {
        private readonly ILikesRepository _likesRepository;
        public LikesController(ILikesRepository likesRepository)
        {
            _likesRepository = likesRepository;
        }


       

        [HttpPost]
        public IActionResult Post(Likes like)
        {


            _likesRepository.Add(like);
            return Ok();
        }

        //Get All Users
        [HttpGet("{userId}/{postId}")]
        public IActionResult Get(int userId, int postId)
        {
            return Ok(_likesRepository.GetAllLikesByUser(userId, postId));
        }


       
      

       

       

        [HttpPut("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _likesRepository.DeleteLike(id);
            return Ok();
        }



    }
}
