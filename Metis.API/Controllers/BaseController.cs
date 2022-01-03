using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Metis.Models;
using Metis.Models.Store;

namespace Metis.API.Controllers
{
    public class BaseController : ControllerBase
    {
        protected readonly ApplicationDbContext _dataContext;
        protected readonly UserManager<User> _userManager;
        protected readonly RoleManager<Role> _roleManager;

        public BaseController(ApplicationDbContext dataContext, UserManager<User> userManager)
        {
            _dataContext = dataContext;
            _userManager = userManager;
        }
        public BaseController(ApplicationDbContext dataContext, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _dataContext = dataContext;
            _userManager = userManager;
            _roleManager = roleManager;
        }
        protected async Task IsUserValidAsync(int userId)
        {
            var currentUser = await _userManager.GetUserAsync(HttpContext.User);
            if (currentUser.Id != userId)
            {
                throw new Exception("You don't have the permission to perform this operation");
            }
        }
        protected async Task IsUserValidAsync(params string[] rolesName)
        {
            var currentUser = await _userManager.GetUserAsync(HttpContext.User);
            var roles = await _userManager.GetRolesAsync(currentUser);

            bool hasRole = false;
            for (int i = 0; i < rolesName.Length; i++)
            {
                roles.Contains(rolesName[i]);
                hasRole = true;
            }
            if (!hasRole)
            {
                throw new Exception("You don't have the permission to perform this operation");
            }
        }
    }
}
