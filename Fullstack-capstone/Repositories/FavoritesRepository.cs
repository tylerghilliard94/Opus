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
                    cmd.CommandText = @"INSERT INTO Favorite (UserProfileId, PostId)
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
                       SELECT f.Id, f.UserProfileId, f.PostId, u.DisplayName, ap.Id, ap.UserProfileId, ap.Image, ap.Title, ap.PostDate, ap.Description, ap.CategoryId, ap.ArtTypeId, c.[Name] AS CategoryName, at.[Name] AS ArtTypeName
                         FROM Favorites f
                         JOIN UserProfile u ON u.Id = f.UserProfileId
                         JOIN ArtPost ap ON ap.Id = f.PostId
                         JOIN Categories c ON c.Id = ap.CategoryId
                         JOIN ArtType at ON at.Id = ap.ArtTypeId
                         WHERE @id = f.UserProfileId
              
                        ORDER BY ap.PostDate;
                      
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
                            UserProfile = new UserProfile()
                            {
                                DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),

                            },
                            ArtPost = new ArtPost()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                Image = reader.GetString(reader.GetOrdinal("Image")),

                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                PostDate = reader.GetDateTime(reader.GetOrdinal("PostDate")),

                                Description = DbUtils.GetString(reader, "Description"),
                                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                ArtTypeId = reader.GetInt32(reader.GetOrdinal("ArtTypeId")),
                                Category = new Category()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                                },
                                ArtType = new ArtType()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("ArtTypeId")),
                                    Name = reader.GetString(reader.GetOrdinal("ArtTypeName"))
                                },

                            }



                        });
                    }

                    reader.Close();

                    return favorites;
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
                        DELETE FROM Favorite
                       
                        WHERE Id = @id";


                    cmd.Parameters.AddWithValue("@id", id);


                    cmd.ExecuteNonQuery();

                }
            }

        }







    }
}
