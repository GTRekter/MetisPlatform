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
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("[controller]")]
    public class RoleController : BaseController
    {
        private readonly IConfiguration _configuration;
        public RoleController(ApplicationDbContext dataContext, IConfiguration configuration)
            : base(dataContext)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("GetRoles")]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        public IActionResult GetRolesAsync()
        {
            var roles = RoleManager.GetRolesAsync(_dataContext).Select(r => new { r.Id, r.Name });
            return Ok(roles);
        }
    }
}