using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Fullstack_capstone.Models;
using Fullstack_capstone.Utils;

namespace Fullstack_capstone.Repositories
{
    public class PrimaryFocusRepository : BaseRepository, IPrimaryFocusRepository
    {
        public PrimaryFocusRepository(IConfiguration configuration) : base(configuration) { }



        public List<PrimaryFocus> GetAllPrimaryFoci()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, [Name] 
                         FROM PrimaryFocus;
                      
                       ";


                    List<PrimaryFocus> primaryFoci = new List<PrimaryFocus>();
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        primaryFoci.Add(new PrimaryFocus()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))

                        });
                    }

                    reader.Close();

                    return primaryFoci;
                }
            }
        }


        public PrimaryFocus GetPrimaryFocus(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, [Name]
                         FROM PrimaryFocus
                             
                        
                       ";

                    cmd.Parameters.AddWithValue("@id", id);
                    PrimaryFocus primaryFocus = new PrimaryFocus();
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        primaryFocus = new PrimaryFocus()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))

                        };
                    }

                    reader.Close();

                    return primaryFocus;
                }
            }
        }








    }
}
