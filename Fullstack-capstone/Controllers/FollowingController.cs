using Microsoft.AspNetCore.Mvc;
using System;
using Fullstack_capstone.Models;
using Fullstack_capstone.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace Fullstack_capstone.Controllers
{
 
    [Route("api/[controller]")]
    [ApiController]
    public class FollowingController : ControllerBase
    {
        private readonly IFollowingRepository _followingRepository;
        public FollowingController(IFollowingRepository followingRepository)
        {
            _followingRepository = followingRepository;
        }


       

        [HttpPost]
        public IActionResult Post(Following following)
        {


            _followingRepository.Add(following);
            return Ok();
        }

        //Get All Users
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_followingRepository.GetAllFollows(id));
        }

      

       

       

        [HttpPut("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _followingRepository.DeleteFollow(id);
            return Ok();
        }



    }
}
