using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Fullstack_capstone.Models;
using Fullstack_capstone.Utils;

namespace Fullstack_capstone.Repositories
{
    public class CommentsRepository : BaseRepository, ICommentsRepository
    {
        public CommentsRepository(IConfiguration configuration) : base(configuration) { }


        public void Add(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (UserProfileId, PostId, 
                                                                 Content, PostDate)
                                        OUTPUT INSERTED.ID
                                        VALUES (@UserProfileId, @PostId, @Content, @PostDate)";
                    DbUtils.AddParameter(cmd, "@UserProfileId", comment.UserProfileId);
                    DbUtils.AddParameter(cmd, "@PostId", comment.PostId);

                    DbUtils.AddParameter(cmd, "@Content", comment.Content);
                    DbUtils.AddParameter(cmd, "@PostDate", comment.PostDate);


                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<Comment> GetAllComments()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT c.Id, c.UserProfileId, c.PostId, c.Content, c.PostDate
                         FROM Comments c
                             
              
                        ORDER BY c.PostDate;
                      
                       ";


                    List<Comment> comments = new List<Comment>();
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        comments.Add(new Comment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),

                            Content = DbUtils.GetString(reader, "FullName"),
                            PostDate = DbUtils.GetDateTime(reader, "PostDate"),



                        });
                    }

                    reader.Close();

                    return comments;
                }
            }
        }


        public Comment GetCommentById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT c.Id, c.UserProfileId, c.PostId, c.Content, c.PostDate
                         FROM UserProfile c
                             
              
                        
                        
                       ";

                    cmd.Parameters.AddWithValue("@id", id);
                    Comment comment = new Comment();
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        comment = new Comment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),

                            Content = DbUtils.GetString(reader, "Content"),
                            PostDate = DbUtils.GetDateTime(reader, "PostDate"),
                        };
                    }

                    reader.Close();

                    return comment;
                }
            }
        }

        public void UpdateComment(Comment comment)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Comment
                        SET
                        UserProfileId = @userProfileId,
                        PostId = @postId,
                        Content = @content,
                        PostDate = @postDate,
                       
                       
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@userProfileId", comment.UserProfileId);
                    cmd.Parameters.AddWithValue("@postId", comment.PostId);
                    cmd.Parameters.AddWithValue("@content", comment.Content);
                    cmd.Parameters.AddWithValue("@postDate", comment.PostDate);


                    cmd.Parameters.AddWithValue("@id", comment.Id);


                    cmd.ExecuteNonQuery();

                }
            }
        }

        public void DeleteComment(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Comment
                       
                        WHERE Id = @id";


                    cmd.Parameters.AddWithValue("@id", id);


                    cmd.ExecuteNonQuery();

                }
            }

        }







    }
}
