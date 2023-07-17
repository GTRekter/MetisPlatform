using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.Extensions.Configuration;
using Metis.API.Models;
using Metis.API.Models.Store;
using Metis.API.Models.Requests;
using Metis.API.Models.Managers;

namespace Metis.API.Controllers
{
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("[controller]")]
    public class RoleController : BaseController
    {
        private readonly IConfiguration _configuration;
        private readonly RoleManager _roleManager;

        public RoleController(ApplicationDbContext dataContext, IConfiguration configuration)
            : base(dataContext)
        {
            _configuration = configuration;
            _roleManager = new RoleManager(dataContext);
        }

        [HttpGet]
        [Route("GetRoles")]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        public async Task<IActionResult> GetRolesAsync()
        {
            var roles = await _roleManager.GetRolesAsync();
            var response = roles.Select(r => new { r.Id, r.Name });
            return Ok(response);
        }
    }
}