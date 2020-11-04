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

            comment.PostDate = DateTime.Now;
            _commentsRepository.Add(comment);
            return Ok();
        }

        //Get All Users
        [HttpGet("all/{id}")]
        public IActionResult Get(int id)
        {
            List<Comment> comments = _commentsRepository.GetAllComments(id);
            foreach(Comment comment in comments)
            {
                comment.CommentDate = comment.PostDate.ToShortDateString();
            }
            return Ok(comments);
        }

        //Get User by User.Id
        [HttpGet("{id}")]
        public IActionResult GetCommentById(int id)
        {
            return Ok(_commentsRepository.GetCommentById(id));
        }

     


        [HttpPut("{id}")]
        public IActionResult Edit(int id, Comment comment)
        {
            _commentsRepository.UpdateComment(comment, id);
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
