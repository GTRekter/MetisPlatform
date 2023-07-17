using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using MongoDB.Driver;
using MongoDB.Bson;
using Metis.Models.Store;

namespace Metis.Models.Managers
{
    public class UserManager
    {
        private readonly ApplicationDbContext _dataContext;

        public UserManager(ApplicationDbContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task AddUserAsync(string name, string surname, string email, bool enabled, int roleId, int languageId, string password)
        {
            var hasher = new PasswordHasher<User>();
            var user = new User
            {
                FirstName = name,
                LastName = surname,
                Email = email,
                Enabled = enabled,
                LanguageId = 2,
                RoleId = 1,
                PasswordHash = password
            };
            user.PasswordHash = hasher.HashPassword(user, password);
            await _dataContext.Users.InsertOneAsync(user);
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _dataContext.Users.Find(x => x.Email == email).FirstOrDefaultAsync();
        }

        public async Task<int> GetUsersCountAsync(int? roleId = null, string searchQuery = null)
        {
            var filters = new List<FilterDefinition<User>>();

            if (roleId.HasValue)
            {
                filters.Add(Builders<User>.Filter.Eq(x => x.RoleId, roleId.Value));
            }

            if (searchQuery != null)
            {
                var searchFilters = Builders<User>.Filter.Or(
                    Builders<User>.Filter.Regex(x => x.FirstName, new BsonRegularExpression(searchQuery, "i")),
                    Builders<User>.Filter.Regex(x => x.LastName, new BsonRegularExpression(searchQuery, "i")),
                    Builders<User>.Filter.Regex(x => x.Email, new BsonRegularExpression(searchQuery, "i"))
                );
                filters.Add(searchFilters);
            }

            var filter = filters.Any() ? Builders<User>.Filter.And(filters) : new BsonDocument();

            return (int)await _dataContext.Users.CountDocumentsAsync(filter);
        }

        public async Task<int> GetActiveUsersCountAsync(int? roleId = null)
        {
            var filter = roleId.HasValue ? Builders<User>.Filter.And(
                                            Builders<User>.Filter.Eq(x => x.Enabled, true),
                                            Builders<User>.Filter.Eq(x => x.RoleId, roleId.Value))
                                        : Builders<User>.Filter.Eq(x => x.Enabled, true);

            return (int)await _dataContext.Users.CountDocumentsAsync(filter);
        }

        public async Task<IEnumerable<User>> GetUsersAsync(int? roleId = null)
        {
            var filter = roleId.HasValue ? Builders<User>.Filter.Eq(x => x.RoleId, roleId.Value) : new BsonDocument();

            return await _dataContext.Users.Find(filter).ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _dataContext.Users.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<User>> GetUsersByPageAsync(int page, int itemsPerPage, int? roleId = null, string searchQuery = null)
        {
            var filters = new List<FilterDefinition<User>>();

            if (roleId.HasValue) 
            {
                filters.Add(Builders<User>.Filter.Eq(x => x.RoleId, roleId.Value));
            }

            if (searchQuery != null) 
            {
                var searchFilters = Builders<User>.Filter.Or(
                    Builders<User>.Filter.Regex(x => x.FirstName, new BsonRegularExpression(searchQuery, "i")),
                    Builders<User>.Filter.Regex(x => x.LastName, new BsonRegularExpression(searchQuery, "i")),
                    Builders<User>.Filter.Regex(x => x.Email, new BsonRegularExpression(searchQuery, "i"))
                );
                filters.Add(searchFilters);
            }

            var filter = filters.Any() ? Builders<User>.Filter.And(filters) : new BsonDocument();

            return await _dataContext.Users.Find(filter)
                .Skip(page * itemsPerPage)
                .Limit(itemsPerPage)
                .SortBy(x => x.FirstName)
                .ToListAsync();
        }

        public async Task EditUserAsync(int id, string name = null, string surname = null, string email = null, bool? enabled = null, int? languageId = null, int? roleId = null)
        {
            var user = await _dataContext.Users.Find(x => x.Id == id).FirstOrDefaultAsync() ?? throw new Exception("User not found");

            user.FirstName = name ?? user.FirstName;
            user.LastName = surname ?? user.LastName;
            user.Email = email ?? user.Email;
            user.Enabled = enabled ?? user.Enabled;
            user.LanguageId = languageId ?? user.LanguageId;
            user.RoleId = roleId ?? user.RoleId;

            await _dataContext.Users.ReplaceOneAsync(x => x.Id == id, user);
        }

        public async Task EditUserPasswordAsync(int id, string password, string newPassword, string confirmNewPassword)
        {
            var hasher = new PasswordHasher<User>();
            User user = await _dataContext.Users.Find(l => l.Id == id).FirstOrDefaultAsync();
            
            if (user == null)
            {
                throw new Exception("User not found");
            }
            
            PasswordVerificationResult result = hasher.VerifyHashedPassword(user, user.PasswordHash, password);
            if (result != PasswordVerificationResult.Success)
            {
                throw new Exception("Password is incorrect");
            }
            
            if (newPassword != confirmNewPassword)
            {
                throw new Exception("New password and confirm new password are not equal");
            }

            user.PasswordHash = hasher.HashPassword(user, newPassword); 
            
            var filter = Builders<User>.Filter.Eq(u => u.Id, id);
            await _dataContext.Users.ReplaceOneAsync(filter, user);
        }
        
        public async Task DeleteUserByIdAsync(int id)
        {
            await _dataContext.Users.FindOneAndDeleteAsync(x => x.Id == id);
        }

        public async Task PasswordSignInAsync(string email, string password)
        {
            var user = await _dataContext.Users.Find(x => x.Email == email).FirstOrDefaultAsync();
            if (user == null)
            {
                throw new Exception("User not found");
            }
            var hasher = new PasswordHasher<User>();
            var result = hasher.VerifyHashedPassword(user, user.PasswordHash, password);
            if (result == PasswordVerificationResult.Failed)
            {
                throw new Exception("Password is incorrect");
            }
        }
    }
}