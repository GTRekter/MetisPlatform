using System;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading.Tasks;
using System.Linq;
using Metis.Models.Store;

namespace Metis.Models.Managers
{
    public partial class RoleManager
    {
        public static async Task AddRoleAsync(ApplicationDbContext dataContext, string name, string description)
        {
            var role = new Role 
            { 
                Name = name, 
                Description = description 
            };
            dataContext.Roles.Add(role);
            await dataContext.SaveChangesAsync();
        }
        public static IEnumerable<Role> GetRolesAsync(ApplicationDbContext dataContext)
        {
            return dataContext.Roles
                .ToList(); ;
        }
    }
}
