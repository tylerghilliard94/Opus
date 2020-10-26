using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Fullstack_capstone.Models;
using Fullstack_capstone.Utils;
using System.Reflection;

namespace Fullstack_capstone.Repositories
{
    public class ArtPostRepository : BaseRepository, IArtPostRepository
    {
        public ArtPostRepository(IConfiguration configuration) : base(configuration) { }



        public void Add(ArtPost artPost)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO ArtPost (UserProfileId, Image, Title, 
                                                                 PostDate,   Description, CategoryId, ArtTypeId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@UserProfileId, @Image, @Title, 
                                                @PostDate,  @Description, @CategoryId, @ArtTypeId)";
                    DbUtils.AddParameter(cmd, "@UserProfileId", artPost.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Image", artPost.Image);

                    DbUtils.AddParameter(cmd, "@Title", artPost.Title);
                    DbUtils.AddParameter(cmd, "@PostDate", artPost.PostDate);

                    DbUtils.AddParameter(cmd, "@Description", artPost.Description);
                    DbUtils.AddParameter(cmd, "@CategoryId", artPost.CategoryId);
                    DbUtils.AddParameter(cmd, "@ArtTypeId", artPost.ArtTypeId);

                    artPost.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<ArtPost> GetAllArtPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT ap.Id, ap.UserProfileId, ap.Image, ap.Title, ap.PostDate, ap.Description, ap.CategoryId, ap.ArtTypeId,
                            at.Name AS ArtTypeName,
                            c.Name AS CategoryName,
                            u.Displayname AS UserDisplayName
                         FROM ArtPost ap
                              LEFT JOIN UserProfile u ON ap.UserProfileId = u.Id
                              LEFT JOIN Categories c ON ap.CategoryId = c.Id
                              LEFT JOIN ArtType at ON ap.ArtTypeId = at.Id
                        WHERE isDeleted = 0
                        ORDER BY ap.PostDate;
                      
                       ";


                   
                    var reader = cmd.ExecuteReader();
                    List<ArtPost> artPosts = new List<ArtPost>();

                    while (reader.Read())
                    {
                        artPosts.Add(new ArtPost()
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
                            UserProfile = new UserProfile()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                DisplayName = reader.GetString(reader.GetOrdinal("UserDisplayName"))
                            }

                        });
                    }

                    reader.Close();

                    return artPosts;
                }
            }
        }


        public ArtPost GetArtPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT ap.Id, ap.UserProfileId, ap.Image, ap.Title, ap.PostDate, ap.Description, ap.CategoryId, ap.ArtTypeId,
                            at.Name AS ArtTypeName,
                            c.Name AS CategoryName,
                            u.Displayname AS UserDisplayName
                         FROM ArtPost ap
                              LEFT JOIN UserProfile u ON ap.UserProfileId = u.Id
                              LEFT JOIN Categories c ON ap.CategoryId = c.Id
                              LEFT JOIN ArtType at ON ap.ArtTypeId = at.Id
              
                       ;
                     
                        
                       ";

                    cmd.Parameters.AddWithValue("@id", id);
                    ArtPost artPost = new ArtPost();
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        artPost = new ArtPost()
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
                            UserProfile = new UserProfile()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                DisplayName = reader.GetString(reader.GetOrdinal("UserDisplayName"))
                            }

                        };
                    }

                    reader.Close();

                    return artPost;
                }
            }
        }

        public List<ArtPost> GetAllArtPostsByUser(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT ap.Id, ap.UserProfileId, ap.Image, ap.Title, ap.PostDate, ap.Description, ap.CategoryId, ap.ArtTypeId,
                            at.Name AS ArtTypeName,
                            c.Name AS CategoryName,
                            u.Displayname AS UserDisplayName
                         FROM ArtPost ap
                              LEFT JOIN UserProfile u ON ap.UserProfileId = u.Id
                              LEFT JOIN Categories c ON ap.CategoryId = c.Id
                              LEFT JOIN ArtType at ON ap.ArtTypeId = at.Id
                        WHERE ap.UserProfileId = @UserProfileId AND WHERE isDeleted = 0
                        ORDER BY ap.PostDate;
                      
                       ";

                    cmd.Parameters.AddWithValue("@UserProfileId", userId);
                    List<ArtPost> artPosts = new List<ArtPost>();
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        artPosts.Add(new ArtPost()
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
                            UserProfile = new UserProfile()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                DisplayName = reader.GetString(reader.GetOrdinal("UserDisplayName"))
                            }

                        });
                    }

                    reader.Close();

                    return artPosts;
                }
            }
        }

        public void UpdateArtPost(ArtPost artPost)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE ArtPost
                        SET
                        Title = @title,
                        Description = @description,
                        Image = @imageLocation,
                        PostDate = @postDate,
                       
                        ArtTypeId = @artTypeId
                        CategoryId = @categoryId
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@title", artPost.Title);
                    cmd.Parameters.AddWithValue("@description", artPost.Description);
                    cmd.Parameters.AddWithValue("@image", artPost.Image);
                    cmd.Parameters.AddWithValue("@postDate", artPost.PostDate);

                    cmd.Parameters.AddWithValue("@categoryId", artPost.CategoryId);
                    cmd.Parameters.AddWithValue("@artTypeId", artPost.ArtTypeId);
                    cmd.Parameters.AddWithValue("@id", artPost.Id);


                    cmd.ExecuteNonQuery();

                }
            }
        }

        public void DeleteArtPost(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE ArtPost
                        SET
                        IsDeleted = @isDeleted
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@isDeleted", 1);
                    cmd.Parameters.AddWithValue("@id", id);


                    cmd.ExecuteNonQuery();

                }
            }

        }

        public void AddLike(int id, int likes)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE ArtPost
                        SET
                        Likes = @Likes
                        WHERE Id = @id";

                    
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@Likes", likes + 1);

                    cmd.ExecuteNonQuery();

                }
            }

        }

        public void RemoveLike(int id, int likes)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE ArtPost
                        SET
                        Likes = @Likes
                        WHERE Id = @id";


                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@Likes", likes - 1);


                    cmd.ExecuteNonQuery();

                }
            }

        }

        public List<ArtPost> SearchArtPosts(int CategoryCriterion, int ArtTypeCriterion)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                       @" SELECT ap.Id, ap.UserProfileId, ap.Image, ap.Title, ap.PostDate, ap.Description, ap.CategoryId, ap.ArtTypeId,
                            at.Name AS ArtTypeName,
                            c.Name AS CategoryName,
                            u.Displayname AS UserDisplayName
                         FROM ArtPost ap
                              LEFT JOIN UserProfile u ON ap.UserProfileId = u.Id
                              LEFT JOIN Categories c ON ap.CategoryId = c.Id
                              LEFT JOIN ArtType at ON ap.ArtTypeId = at.Id
                      WHERE ap.CategoryId = @CategoryCriterion AND ap.ArtTypeId = @ArtTypeCriterion AND ap.IsDeleted = 0
                        
                        ORDER BY ap.PostDate
                    ";




                    DbUtils.AddParameter(cmd, "@CategoryCriterion", CategoryCriterion);
                    DbUtils.AddParameter(cmd, "@ArtTypeCriterion", ArtTypeCriterion);

                    var reader = cmd.ExecuteReader();

                    List<ArtPost> artPosts = new List<ArtPost>();
                 

                    while (reader.Read())
                    {
                        artPosts.Add(new ArtPost()
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
                            UserProfile = new UserProfile()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                DisplayName = reader.GetString(reader.GetOrdinal("UserDisplayName"))
                            }

                        });
                    }

                    reader.Close();

                    return artPosts;
                }
            }
        }
   






    }
}
