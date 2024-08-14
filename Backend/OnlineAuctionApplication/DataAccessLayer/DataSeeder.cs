using BusinessObjectLayer;
using DataAccessLayer;
using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public static class DataSeeder
    {
        public static void SeedData(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                if (!context.Users.Any())
                {
                    var users = new List<User>
                {
                    new User
                    {
                        Name = "admin1",
                        EmailId = "admin1@auction.com",
                        Password = "Admin",
                        IsAdmin = true
                    },
                    new User
                    {
                        Name = "Aman",
                        EmailId = "aman@auction.com",
                        Password = "Aman",
                        IsAdmin = false
                    },
                    new User
                    {
                        Name = "Amit",
                        EmailId = "amit@auction.com",
                        Password = "Amit",
                        IsAdmin = false
                    },
                    new User
                    {
                        Name = "Akash",
                        EmailId = "akash@auction.com",
                        Password = "Akash",
                        IsAdmin = false
                    },
                };
                context.Users.AddRange(users);
                context.SaveChanges();
                }
            }
        }
    }
}
