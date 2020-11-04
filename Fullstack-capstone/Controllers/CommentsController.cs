using Microsoft.AspNetCore.Mvc;
using System;
using Fullstack_capstone.Models;
using Fullstack_capstone.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace Fullstack_capstone.Controllers
{
 
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentsRepository _commentsRepository;
        public CommentsController(ICommentsRepository commentsRepository)
        {
            _commentsRepository = commentsRepository;
        }


       

        [HttpPost]
        public IActionResult Post(Comment comment)
        {


            _commentsRepository.Add(comment);
            return Ok();
        }

        //Get All Users
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_commentsRepository.GetAllComments());
        }

        //Get User by User.Id
        [HttpGet("{id}")]
        public IActionResult GetCommentById(int id)
        {
            return Ok(_commentsRepository.GetCommentById(id));
        }

     


        [HttpPut("{id}")]
        public IActionResult Edit(Comment comment)
        {
            _commentsRepository.UpdateComment(comment);
            return Ok();
        }

        [HttpPut("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _commentsRepository.DeleteComment(id);
            return Ok();
        }



    }
}
