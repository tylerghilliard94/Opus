using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Fullstack_capstone.Models;
using Fullstack_capstone.Utils;

namespace Fullstack_capstone.Repositories
{
    public class FavoritesRepository : BaseRepository, IFavoritesRepository
    {
        public FavoritesRepository(IConfiguration configuration) : base(configuration) { }


        public void Add(Favorite favorite)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Favorites (UserProfileId, PostId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@UserProfileId, @PostId)";
                    DbUtils.AddParameter(cmd, "@UserProfileId", favorite.UserProfileId);
                    DbUtils.AddParameter(cmd, "@PostId", favorite.PostId);



                    favorite.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<Favorite> GetAllFavorites(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT f.Id, f.UserProfileId, f.PostId
                         FROM Favorites f
                        
              
                        ;
                      
                       ";

                    cmd.Parameters.AddWithValue("@id", id);
                    List<Favorite> favorites = new List<Favorite>();
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        favorites.Add(new Favorite()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            



                        });
                    }

                    reader.Close();

                    return favorites;
                }
            }
        }

        public Favorite GetFavorite(int userId, int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT f.Id, f.UserProfileId, f.PostId
                         FROM Favorites f
                        
                         WHERE @userId = f.UserProfileId AND @postId = f.PostId
              
                        ;
                      
                       ";

                    cmd.Parameters.AddWithValue("@userId", userId);
                    cmd.Parameters.AddWithValue("@postId", postId);
                    Favorite favorite = new Favorite();
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        favorite = new Favorite()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                           

                            



                        };
                    }

                    reader.Close();

                    return favorite;
                }
            }
        }






        public void DeleteFavorite(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Favorites
                       
                        WHERE Id = @id";


                    cmd.Parameters.AddWithValue("@id", id);


                    cmd.ExecuteNonQuery();

                }
            }

        }







    }
}
