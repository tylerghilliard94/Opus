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
                    cmd.CommandText = @"INSERT INTO Comments (UserProfileId, PostId, 
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

        public List<Comment> GetAllComments(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT c.Id, c.UserProfileId, c.PostId, c.Content, c.PostDate, up.DisplayName
                         FROM Comments c
                         JOIN UserProfile up ON up.Id = c.UserProfileId
                        WHERE c.PostId = @PostId
                        ORDER BY c.PostDate DESC;
                      
                       ";

                    cmd.Parameters.AddWithValue("@PostId", id);
                    List<Comment> comments = new List<Comment>();
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        comments.Add(new Comment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),

                            Content = DbUtils.GetString(reader, "Content"),
                            PostDate = DbUtils.GetDateTime(reader, "PostDate"),
                            
                            UserProfile = new UserProfile()
                            {
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            }



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

        public void UpdateComment(Comment comment, int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Comments
                        SET
                        UserProfileId = @userProfileId,
                        PostId = @postId,
                        Content = @content
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@userProfileId", comment.UserProfileId);
                    cmd.Parameters.AddWithValue("@postId", comment.PostId);
                    cmd.Parameters.AddWithValue("@content", comment.Content);
                    


                    cmd.Parameters.AddWithValue("@id", id);


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
                        DELETE FROM Comments
                       
                        WHERE Id = @id";


                    cmd.Parameters.AddWithValue("@id", id);


                    cmd.ExecuteNonQuery();

                }
            }

        }







    }
}
