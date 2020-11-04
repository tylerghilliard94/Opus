using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Fullstack_capstone.Models;
using Fullstack_capstone.Utils;

namespace Fullstack_capstone.Repositories
{
    public class CategoriesRepository : BaseRepository, ICategoriesRepository
    {
        public CategoriesRepository(IConfiguration configuration) : base(configuration) { }



        public List<Category> GetAllCategories()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, [Name] 
                         FROM Categories;
                      
                       ";


                    List<Category> categories = new List<Category>();
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        categories.Add(new Category()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))

                        });
                    }

                    reader.Close();

                    return categories;
                }
            }
        }


        public Category GetCategory(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, [Name]
                         FROM Category
                             
                        
                       ";

                    cmd.Parameters.AddWithValue("@id", id);
                    Category category = new Category();
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        category = new Category()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))

                        };
                    }

                    reader.Close();

                    return category;
                }
            }
        }








    }
}
