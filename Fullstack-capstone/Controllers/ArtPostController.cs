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
    public class ArtPostController : ControllerBase
    {
        private readonly IArtPostRepository _artPostRepository;
        private readonly IFollowingRepository _followingRepository;
        private readonly IFavoritesRepository _favoritesRepository;
        public ArtPostController(IArtPostRepository artPostRepository, IFollowingRepository followingRepository, IFavoritesRepository favoritesRepository)
        {
            _artPostRepository = artPostRepository;
            _followingRepository = followingRepository;
            _favoritesRepository = favoritesRepository;
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
        public IActionResult SearchArtPosts(int userId, int CategoryCriterion, int ArtTypeCriterion, bool latestSwitch, bool trendingSwitch, bool followingSwitch)
        {   if(followingSwitch == true)
            {
                List<Favorite> favorites = new List<Favorite>();
                List<Following> follows = _followingRepository.GetAllFollows(userId);


                return Ok(_artPostRepository.SearchArtPosts(CategoryCriterion, ArtTypeCriterion, latestSwitch, trendingSwitch, follows, favorites));
            
            }else if(latestSwitch == false && trendingSwitch == false && followingSwitch == false)
            {
                List<Favorite> favorites = _favoritesRepository.GetAllFavorites(userId);
                    List<Following> follows = new List<Following>();

                return Ok(_artPostRepository.SearchArtPosts(CategoryCriterion, ArtTypeCriterion, latestSwitch, trendingSwitch, follows, favorites));
            }
            else
            {
                List<Favorite> favorites = new List<Favorite>();
                List<Following> follows = new List<Following>();

                return Ok(_artPostRepository.SearchArtPosts(CategoryCriterion, ArtTypeCriterion, latestSwitch, trendingSwitch, follows, favorites));
            }
            
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


        [HttpPut("addLike/{id}/{likes}")]
        public IActionResult AddLike(int id, int likes)
        {
            _artPostRepository.AddLike(id, likes);
            return Ok();
        }

        [HttpPut("removeLike/{id}/{likes}")]
        public IActionResult RemoveLike(int id, int likes)
        {
            _artPostRepository.RemoveLike(id, likes);
            return Ok();
        }


    }
}
