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
    public class ArtPostController : ControllerBase
    {
        private readonly IArtPostRepository _artPostRepository;
        public ArtPostController(IArtPostRepository artPostRepository)
        {
            _artPostRepository = artPostRepository;
        }


       

        [HttpPost]
        public IActionResult Post(ArtPost artPost)
        {


            _artPostRepository.Add(artPost);
            return Ok();
        }

        //Get All Users
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_artPostRepository.GetAllArtPosts());
        }

        //Get User by User.Id
        [HttpGet("{id}")]
        public IActionResult GetUserProfileById(int id)
        {
            return Ok(_artPostRepository.GetArtPostById(id));
        }

        [HttpGet("user/{id}")]
        public IActionResult GetUserProfileByUserId(int id)
        {
            return Ok(_artPostRepository.GetAllArtPostsByUser(id));
        }

        [HttpGet("search")]
        public IActionResult SearchArtPosts(int CategoryCriterion, int ArtTypeCriterion)
        {
            return Ok(_artPostRepository.SearchArtPosts(CategoryCriterion, ArtTypeCriterion));
        }

        [HttpPut]
        public IActionResult Edit(ArtPost artPost)
        {
            _artPostRepository.UpdateArtPost(artPost);
            return Ok();
        }

        [HttpPut("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _artPostRepository.DeleteArtPost(id);
            return Ok();
        }



    }
}
