using Microsoft.AspNetCore.Mvc;
using System;
using Fullstack_capstone.Models;
using Fullstack_capstone.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace Fullstack_capstone.Controllers
{
 
    [Route("api/[controller]")]
    [ApiController]
    public class FollowingController : ControllerBase
    {
        private readonly IFollowingRepository _followingRepository;
        private readonly IArtPostRepository _artPostRepository;
        public FollowingController(IFollowingRepository followingRepository, IArtPostRepository artPostRepository)
        {
            _followingRepository = followingRepository;
            _artPostRepository = artPostRepository;
        }


       

        [HttpPost]
        public IActionResult Post(Following following)
        {


            _followingRepository.Add(following);
            return Ok();
        }

        //Get All Users
        [HttpGet("{id}")]
        public IActionResult GetFollow(int id)
        {
            return Ok(_followingRepository.GetAllFollows(id));
        }

        [HttpGet("{subscriberId}/{subscribedToId}")]
        public IActionResult GetFollow(int subscriberId, int subscribedToId)
        {
            return Ok(_followingRepository.GetFollowById(subscriberId, subscribedToId));
        }







        [HttpPut("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _followingRepository.DeleteFollow(id);
            return Ok();
        }



    }
}
