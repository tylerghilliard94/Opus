using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Fullstack_capstone.Models;
using Fullstack_capstone.Utils;

namespace Fullstack_capstone.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, Up.FirebaseUserId, up.FullName, up.DisplayName, 
                               up.Email, up.PrimaryFocusId, up.Image, up.Description,
                               pf.Name AS PrimaryFocus
                          FROM UserProfile up
                               LEFT JOIN PrimaryFocus pf on up.PrimaryFocusId = pf.Id
                         WHERE FirebaseUserId = @FirebaseuserId ";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FullName = DbUtils.GetString(reader, "FullName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            
                           
                            PrimaryFocusId = DbUtils.GetInt(reader, "PrimaryFocusId"),
                            PrimaryFocus = new PrimaryFocus()
                            {
                                Id = DbUtils.GetInt(reader, "PrimaryFocusId"),
                                Name = DbUtils.GetString(reader, "PrimaryFocus"),
                            },

                             Image = DbUtils.GetString(reader, "Image"),
                             Description = DbUtils.GetString(reader, "Description")
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FullName, DisplayName, 
                                                                 Email,   PrimaryFocusId, Image, Description)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @Fullname, @DisplayName, 
                                                @Email,  @PrimaryFocusId, @Image, @Description)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FullName", userProfile.FullName);
             
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                   
                    DbUtils.AddParameter(cmd, "@Image", userProfile.Image);
                    DbUtils.AddParameter(cmd, "@PrimaryFocusId", userProfile.PrimaryFocusId);
                    DbUtils.AddParameter(cmd, "@Description", userProfile.Description);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<UserProfile> GetAllUserProfiles()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT u.Id, u.FirebaseUserId, u.FullName, u.DisplayName, u.Email,
                          u.UserTypeId, u.Image
                              pf.[Name] AS PrimaryFocus
                         FROM UserProfile u
                              LEFT JOIN PrimaryFocus pf ON u.UserTypeId = pf.Id
              
                        ORDER BY u.DisplayName;
                      
                       ";


                    List<UserProfile> userProfiles = new List<UserProfile>();
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        userProfiles.Add(new UserProfile()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            
                            FullName = reader.GetString(reader.GetOrdinal("FullName")),
                            DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                            
                            Image = DbUtils.GetNullableString(reader, "Image"),
                            PrimaryFocusId = reader.GetInt32(reader.GetOrdinal("PrimaryFocusId")),
                            PrimaryFocus= new PrimaryFocus()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("PrimaryFocusId")),
                                Name = reader.GetString(reader.GetOrdinal("PrimaryFocus"))
                            },
                            
                        });
                    }

                    reader.Close();

                    return userProfiles;
                }
            }
        }


        public UserProfile GetUserProfileById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT u.id, u.FullName, u.FirebaseUserId, u.DisplayName, u.Email,
                           u.Image, u.PrimaryFocusId, u.Description,
                              pf.[Name] AS PrimaryFocus
                         FROM UserProfile u
                              LEFT JOIN PrimaryFocus pf ON u.PrimaryFocusId = pf.id
                        WHERE u.id = @id 
                        ORDER BY u.DisplayName;
                        
                       ";

                    cmd.Parameters.AddWithValue("@id", id);
                    UserProfile userProfile = new UserProfile();
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            FullName = reader.GetString(reader.GetOrdinal("FullName")),
                            
                            DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                            Description = reader.GetString(reader.GetOrdinal("Description")),
                            Image = DbUtils.GetNullableString(reader, "Image"),
                            PrimaryFocusId = reader.GetInt32(reader.GetOrdinal("PrimaryFocusId")),
                            PrimaryFocus = new PrimaryFocus()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("PrimaryFocusId")),
                                Name = reader.GetString(reader.GetOrdinal("PrimaryFocus"))
                            },
                            
                        };
                    }

                    reader.Close();

                    return userProfile;
                }
            }
        }


        public void UpdateUserProfile(UserProfile userProfile)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UserProfile
                        SET
                        FullName = @fullName,
                        DisplayName = @displayName,
                        Description = @description,
                        Image = @image,
                      
                       
                        
                        PrimaryFocusId = @primaryFocusId
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@fullName", userProfile.FullName);
                    cmd.Parameters.AddWithValue("@displayName", userProfile.DisplayName);
                    cmd.Parameters.AddWithValue("@description", userProfile.Description);
                    cmd.Parameters.AddWithValue("@image", userProfile.Image);


                    
                    cmd.Parameters.AddWithValue("@primaryFocusId", userProfile.PrimaryFocusId);
                    cmd.Parameters.AddWithValue("@id", userProfile.Id);


                    cmd.ExecuteNonQuery();

                }
            }
        }

        public void DeleteUserProfile(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UserProfile
                        SET
                        IsDeleted = @isDeleted
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@isDeleted", 1);
                    cmd.Parameters.AddWithValue("@id", id);


                    cmd.ExecuteNonQuery();

                }
            }

        }





    }
}
