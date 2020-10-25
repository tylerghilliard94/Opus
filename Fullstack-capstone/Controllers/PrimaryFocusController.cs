using Microsoft.AspNetCore.Mvc;
using System;
using Fullstack_capstone.Models;
using Fullstack_capstone.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace Fullstack_capstone.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class PrimaryFocusController : ControllerBase
    {
        private readonly IPrimaryFocusRepository _primaryFocusRepository;
        public PrimaryFocusController(IPrimaryFocusRepository primaryFocusRepository)
        {
            _primaryFocusRepository = primaryFocusRepository;
        }

      

       

      
        //Get All Users
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_primaryFocusRepository.GetAllPrimaryFoci());
        }

        //Get User by User.Id
        [HttpGet("{id}")]
        public IActionResult GetUserProfileById(int id)
        {
            return Ok(_primaryFocusRepository.GetPrimaryFocus(id));
        }

       
       
    }
}
