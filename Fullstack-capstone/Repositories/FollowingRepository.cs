using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Fullstack_capstone.Models;
using Fullstack_capstone.Utils;

namespace Fullstack_capstone.Repositories
{
    public class FollowingRepository : BaseRepository, IFollowingRepository
    {
        public FollowingRepository(IConfiguration configuration) : base(configuration) { }


        public void Add(Following follow)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Following (SubscriberId, SubscribedToId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@SubscriberId, @SubscribedToId)";
                    DbUtils.AddParameter(cmd, "@SubscriberId", follow.SubscriberId);
                    DbUtils.AddParameter(cmd, "@SubscribedToId", follow.SubscribedToId);



                    follow.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<Following> GetAllFollows(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT f.Id, f.SubscriberId, f.SubscribedToId
                         FROM Following f
                         WHERE f.SubscriberId = @id
                      
                             
              
                       
                      
                       ";

                    cmd.Parameters.AddWithValue("@id", id);
                    List<Following> follows = new List<Following>();
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        follows.Add(new Following()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            SubscriberId = DbUtils.GetInt(reader, "SubscriberId"),
                            SubscribedToId = DbUtils.GetInt(reader, "SubscribedToId"),


                        });





                    }

                    reader.Close();

                    return follows;
                }
            }
        }






        public void DeleteFollow(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Follow
                       
                        WHERE Id = @id";


                    cmd.Parameters.AddWithValue("@id", id);


                    cmd.ExecuteNonQuery();

                }
            }

        }







    }
}
