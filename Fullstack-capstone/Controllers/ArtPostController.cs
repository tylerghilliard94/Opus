using Microsoft.AspNetCore.Mvc;
using System;
using Fullstack_capstone.Models;
using Fullstack_capstone.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Security.Cryptography;

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

            artPost.PostDate = DateTime.Now;
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

        [HttpGet("recommended/{id}")]
        public IActionResult GetRecommendedPosts(int id)
        {
            List<ArtPost> recommendedPosts = new List<ArtPost>();
            List<ArtPost> recommendedPostsFiltered = new List<ArtPost>();
            List<Following> userFollows = new List<Following>();
            List<Following> follows = _followingRepository.GetAllFollows(id);
            foreach (Following follow in follows)
            {
                 userFollows = _followingRepository.GetAllFollows(follow.SubscribedToId);
                foreach (Following userFollow in userFollows)
                {
                    if (userFollow.SubscribedToId != id)
                    {


                        List<ArtPost> userPosts = _artPostRepository.GetAllArtPostsByUser(userFollow.SubscribedToId);

                        foreach (ArtPost post in userPosts)
                        {
                            recommendedPosts.Add(post);
                        }
                    }
                }
            }
            int numTest = -1;
            int numTest2 = -2;
            int numTest3 = -3;
            int numTest4 = -4;
            var random = new Random();
            ArtPost numPost = new ArtPost();
            for (int i = 0; i < 5; i++)
            {
                double randomNumber = (random.NextDouble() * recommendedPosts.Count);
                double roundedNum = Math.Floor(randomNumber);
                int num = (int)roundedNum;
                if (num == numTest || num == numTest2 || num == numTest3 || num == numTest4)
                {
                    i--;
                }
                else
                {


                    try
                    {
                      numPost = recommendedPosts[num];
                    }
                    catch
                    {
                        i--;
                        break;
                    }
                    numTest4 = numTest3;
                    numTest3 = numTest2;
                    numTest2 = numTest;
                    numTest = num;

                    recommendedPostsFiltered.Add(numPost);
                }
              
            }
          
                return Ok(recommendedPostsFiltered);
            
            
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
