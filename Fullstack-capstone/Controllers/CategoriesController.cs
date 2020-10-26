using Microsoft.AspNetCore.Mvc;
using System;
using Fullstack_capstone.Models;
using Fullstack_capstone.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace Fullstack_capstone.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoriesRepository _categoriesRepository;
        public CategoriesController(ICategoriesRepository categoriesRepository)
        {
            _categoriesRepository = categoriesRepository;
        }

      

       

      
        //Get All Users
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoriesRepository.GetAllCategories());
        }

        //Get User by User.Id
        [HttpGet("{id}")]
        public IActionResult GetArtTypeById(int id)
        {
            return Ok(_categoriesRepository.GetCategory(id));
        }

       
       
    }
}
