using System.Collections.Generic;
using System.Threading.Tasks;
using Metis.Models.Managers;
using Metis.Models.Store;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Metis.Models.Requests;

namespace Metis.API.Controllers
{
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("[controller]")]
    public class GrammarPointController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public GrammarPointController(ApplicationDbContext context)
        {
            _context = context;
        }
        
        [HttpPost]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("AddGrammarPoint")]
        public async Task<IActionResult> AddGrammarPointAsync(AddGrammarPointRequest request)
        {
            if (request == null)
            {
                return NotFound();
            }
            await GrammarPointManager.AddGrammarPointAsync(_context, request.Title, request.Description, request.LanguageId);
            return Ok();
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("EditGrammarPoint")]
        public async Task<IActionResult> EditGrammarPointAsync(EditGrammarPointRequest request)
        {
            await GrammarPointManager.EditGrammarPointAsync(_context, request.Id, request.Title, request.Description, request.LanguageId);
            return Ok();
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetGrammarPoints")]
        public async Task<IActionResult> GetGrammarPointsAsync()
        {
            IEnumerable<GrammarPoint> grammarPoints = await GrammarPointManager.GetGrammarPointsAsync(_context);
            return Ok(grammarPoints);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetGrammarPointsByLanguageId")]
        public async Task<IActionResult> GetGrammarPointsByLanguageIdAsync(int id)
        {
            var grammarPoint = await GrammarPointManager.GetGrammarPointsByLanguageIdAsync(_context, id);
            return Ok(grammarPoint);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetGrammarPointById")]
        public async Task<IActionResult> GetGrammarPointByIdAsync(int id)
        {
            var grammarPoint = await GrammarPointManager.GetGrammarPointByIdAsync(_context, id);
            return Ok(grammarPoint);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetGrammarPointsByPage")]
        public async Task<IActionResult> GetUsersByPageAsync(int page, int itemsPerPage)
        {
            IEnumerable<GrammarPoint> grammarPoints = await GrammarPointManager.GetGrammarPointsByPageAsync(_context, page, itemsPerPage);
            return Ok(grammarPoints);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetGrammarPointsByPageAndSearchQuery")]
        public async Task<IActionResult> GetGrammarPointsByPageAndSearchQueryAsync(int page, int itemsPerPage, string searchQuery)
        {
            IEnumerable<GrammarPoint> grammarPoints = await GrammarPointManager.GetGrammarPointsByPageAsync(_context, page, itemsPerPage, searchQuery);
            return Ok(grammarPoints);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetGrammarPointsCount")]
        public async Task<IActionResult> GetGrammarPointsCountAsync()
        {
            int counter = await GrammarPointManager.GetGrammarPointsCountAsync(_context);
            return Ok(counter);
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("DeleteGrammarPointById")]
        public async Task<IActionResult> DeleteGrammarPointByIdAsync(int id)
        {
            await GrammarPointManager.DeleteGrammarPointByIdAsync(_context, id);
            return Ok();
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetGrammarPointsBySearchQueryCount")]
        public async Task<IActionResult> GetGrammarPointsBySearchQueryCountAsync(string searchQuery)
        {
            int counter = await GrammarPointManager.GetGrammarPointsCountAsync(_context, searchQuery);
            return Ok(counter);
        }
    }
}
