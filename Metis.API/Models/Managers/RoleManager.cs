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
        public static IEnumerable<Role> GetRoles(ApplicationDbContext context)
        {
            return context.Roles.ToList(); ;
        }

        public static IEnumerable<Role> GetRolesByUserId(ApplicationDbContext context, int userId)
        {
            var roles = context.UserRoles.Where(ur => ur.UserId == userId).Select(ur => ur.RoleId).ToList();
            return context.Roles.Where(r => roles.Contains(r.Id)).ToList();
        }

        public static async Task<IdentityResult> AddRole(RoleManager<Role> roleManager, string name, string description)
        {
            var role = new Role { Name = name, Description = description };
            return await roleManager.CreateAsync(role);
        }
    }
}
