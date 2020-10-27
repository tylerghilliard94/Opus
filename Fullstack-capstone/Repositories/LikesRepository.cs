using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Fullstack_capstone.Models;
using Fullstack_capstone.Utils;
using System.Reflection.Metadata;

namespace Fullstack_capstone.Repositories
{
    public class LikesRepository : BaseRepository, ILikesRepository
    {
        public LikesRepository(IConfiguration configuration) : base(configuration) { }


        public void Add(Likes like)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO likes (UserProfileId, PostId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@UserProfileId, @PostId)";
                    DbUtils.AddParameter(cmd, "@UserProfileId", like.UserProfileId);
                    DbUtils.AddParameter(cmd, "@PostId", like.PostId);



                    like.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public Likes GetAllLikesByUser(int userId, int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, UserProfileId, PostId
                            FROM Likes
                        WHERE UserProfileId = @userId AND PostId = @postId
                        
                      
                       ";

                    cmd.Parameters.AddWithValue("@userId", userId);
                    cmd.Parameters.AddWithValue("@postId", postId);
                    Likes like = new Likes();
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        like = new Likes()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            



                        };
                    }

                    reader.Close();

                    return like;
                }
            }
        }






        public void DeleteLike(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Likes
                       
                        WHERE Id = @id";


                    cmd.Parameters.AddWithValue("@id", id);


                    cmd.ExecuteNonQuery();

                }
            }

        }







    }
}
