using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Metis.Models.Store;
using Metis.Models.Requests;
using Metis.Models.Managers;
using Metis.Models;

namespace Metis.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class RoleController : BaseController
    {
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;

        public RoleController(ApplicationDbContext dataContext, UserManager<User> userManager, RoleManager<Role> roleManager, SignInManager<User> signInManager, IConfiguration configuration)
            : base(dataContext, userManager, roleManager)
        {
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpGet]
        [Route("GetRoles")]
        [Authorize(Roles = "Administrator, Teacher")]
        public async Task<IActionResult> GetRolesAsync()
        {
            var roles = RoleManager.GetRoles(_dataContext).Select(r => new { r.Id, r.Name });
            return Ok(roles);
        }
    }
}