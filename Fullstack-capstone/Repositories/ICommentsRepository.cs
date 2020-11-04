using Fullstack_capstone.Models;
using System.Collections.Generic;

namespace Fullstack_capstone.Repositories
{
    public interface ICommentsRepository
    {
        void Add(Comment comment);
        void DeleteComment(int id);
        List<Comment> GetAllComments(int id);
        Comment GetCommentById(int id);
        void UpdateComment(Comment comment, int id);
    }
}