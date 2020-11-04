using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Fullstack_capstone.Models;
using Fullstack_capstone.Utils;

namespace Fullstack_capstone.Repositories
{
    public class ArtTypeRepository : BaseRepository, IArtTypeRepository
    {
        public ArtTypeRepository(IConfiguration configuration) : base(configuration) { }



        public List<ArtType> GetAllArtTypes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, [Name] 
                         FROM ArtType;
                      
                       ";


                    List<ArtType> artTypes = new List<ArtType>();
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        artTypes.Add(new ArtType()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))

                        });
                    }

                    reader.Close();

                    return artTypes;
                }
            }
        }


        public ArtType GetArtType(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, [Name]
                         FROM ArtType
                             
                        
                       ";

                    cmd.Parameters.AddWithValue("@id", id);
                    ArtType artType = new ArtType();
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        artType = new ArtType()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))

                        };
                    }

                    reader.Close();

                    return artType;
                }
            }
        }








    }
}
