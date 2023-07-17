using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using MongoDB.Driver;
using Metis.Models.Store;

namespace Metis.Models.Managers
{
    public class RoleManager
    {
        private readonly ApplicationDbContext _dataContext;

        public RoleManager(ApplicationDbContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task AddRoleAsync(string name, string description)
        {
            var role = new Role 
            { 
                Name = name, 
                Description = description 
            };
            await _dataContext.Roles.InsertOneAsync(role);
        }

        public async Task<Role> GetRoleByNameAsync(string name)
        {
            return await _dataContext.Roles
                .Find(x => x.Name == name)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Role>> GetRolesAsync()
        {
            return await _dataContext.Roles.Find(_ => true).ToListAsync();
        }
    }
}
