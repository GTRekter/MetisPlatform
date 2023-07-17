using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Metis.Models.Store
{
    public class ApplicationDbContext
    {
        private readonly IMongoDatabase _database;
        public IMongoCollection<User> Users { get; }
        public IMongoCollection<Role> Roles { get; }

        public ApplicationDbContext(IOptions<DatabaseSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);
            Users = _database.GetCollection<User>("Users");
            Roles = _database.GetCollection<Role>("Roles");

            SeedRoles();
            SeedUsers();
        }

        public void SeedRoles()
        {
            var roles = new List<Role>
            {
                new Role { Id = 1, Name = "Administrator", Description = "" },
                new Role { Id = 2, Name = "Teacher", Description = "" },
                new Role { Id = 3, Name = "Student", Description = "" }
            };

            Roles.InsertMany(roles);
        }

        public void SeedUsers()
        {
            var hasher = new PasswordHasher<User>();
            var user = new User
            {
                Id = 1,
                FirstName = "Admin",
                LastName = "Admin",
                LanguageId = 1,
                Email = "admin@metis.com",
                RoleId = 1,
                Enabled = true
            };
            user.PasswordHash = hasher.HashPassword(user, "P@ssw0rd");
            
            Users.InsertOne(user);
        }
    }
}