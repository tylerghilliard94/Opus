using Microsoft.AspNetCore.Mvc;
using System;
using Fullstack_capstone.Models;
using Fullstack_capstone.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace Fullstack_capstone.Controllers
{
 
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly IFavoritesRepository _favoritesRepository;
        public FavoritesController(IFavoritesRepository favoritesRepository)
        {
            _favoritesRepository = favoritesRepository;
        }


       

        [HttpPost]
        public IActionResult Post(Favorite favorite)
        {


            _favoritesRepository.Add(favorite);
            return Ok();
        }

        //Get All Users
        [HttpGet("{id}")]
        public IActionResult GetAllFavorites(int id)
        {
            return Ok(_favoritesRepository.GetAllFavorites(id));
        }

        [HttpGet("{userId}/{postId}")]
        public IActionResult GetFavorite(int userId, int postId)
        {
            return Ok(_favoritesRepository.GetFavorite(userId, postId));
        }






        [HttpPut("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _favoritesRepository.DeleteFavorite(id);
            return Ok();
        }



    }
}
