using Microsoft.AspNetCore.Mvc;
using System;
using Fullstack_capstone.Models;
using Fullstack_capstone.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace Fullstack_capstone.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class ArtTypeController : ControllerBase
    {
        private readonly IArtTypeRepository _artTypeRepository;
        public ArtTypeController(IArtTypeRepository artTypeRepository)
        {
            _artTypeRepository = artTypeRepository;
        }

      

       

      
        //Get All Users
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_artTypeRepository.GetAllArtTypes());
        }

        //Get User by User.Id
        [HttpGet("{id}")]
        public IActionResult GetArtTypeById(int id)
        {
            return Ok(_artTypeRepository.GetArtType(id));
        }

       
       
    }
}
