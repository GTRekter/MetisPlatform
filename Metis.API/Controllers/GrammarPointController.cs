using System.Collections.Generic;
using System.Threading.Tasks;
using Metis.Models.Managers;
using Metis.Models.Store;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Metis.Models.Requests;

namespace Metis.API.Controllers
{
    [Authorize]
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
        [Authorize(Roles = "Administrator, Teacher")]
        [Route("AddGrammarPoint")]
        public async Task<IActionResult> AddGrammarPointAsync(AddGrammarPointRequest request)
        {
            if (request == null)
            {
                return NotFound();
            }
            await GrammarPointManager.AddGrammarPoint(_context, request.Title, request.Description);
            return Ok();
        }

        [HttpGet]
        [Authorize]
        [Route("GetGrammarPoints")]
        public async Task<IActionResult> GetGrammarPointsAsync()
        {
            IEnumerable<GrammarPoint> grammarPoints = await GrammarPointManager.GetGrammarPoints(_context);
            return Ok(grammarPoints);
        }

        [HttpGet]
        [Authorize]
        [Route("GetGrammarPointById")]
        public async Task<IActionResult> GetGrammarPointByIdAsync(int id)
        {
            var grammarPoint = await GrammarPointManager.GetGrammarPointById(_context, id);
            return Ok(grammarPoint);
        }

        [HttpGet]
        [Authorize(Roles = "Administrator, Teacher")]
        [Route("GetGrammarPointsByPage")]
        public async Task<IActionResult> GetUsersByPageAsync(int page, int itemsPerPage)
        {
            IEnumerable<GrammarPoint> grammarPoints = await GrammarPointManager.GetGrammarPointsByPage(_context, page, itemsPerPage);
            return Ok(grammarPoints);
        }

        [HttpGet]
        [Authorize(Roles = "Administrator, Teacher")]
        [Route("GetGrammarPointsByPageAndSearchQuery")]
        public async Task<IActionResult> GetGrammarPointsByPageAndSearchQueryAsync(int page, int itemsPerPage, string searchQuery)
        {
            IEnumerable<GrammarPoint> grammarPoints = await GrammarPointManager.GetGrammarPointsByPageAndSearchQuery(_context, page, itemsPerPage, searchQuery);
            return Ok(grammarPoints);
        }

        [HttpGet]
        [Authorize(Roles = "Administrator, Teacher")]
        [Route("GetGrammarPointsCount")]
        public async Task<IActionResult> GetGrammarPointsCountAsync()
        {
            int counter = await GrammarPointManager.GetGrammarPointsCount(_context);
            return Ok(counter);
        }

        [HttpGet]
        [Authorize(Roles = "Administrator, Teacher")]
        [Route("GetGrammarPointsBySearchQueryCount")]
        public async Task<IActionResult> GetGrammarPointsBySearchQueryCountAsync(string searchQuery)
        {
            int counter = await GrammarPointManager.GetGrammarPointsBySearchQueryCount(_context, searchQuery);
            return Ok(counter);
        }

        [HttpPost]
        [Authorize(Roles = "Administrator, Teacher")]
        [Route("EditGrammarPoint")]
        public async Task<IActionResult> EditGrammarPointAsync(EditGrammarPointRequest model)
        {
            await GrammarPointManager.EditGrammarPoint(_context, model.Id, model.Title, model.Description);
            return Ok();
        }
        
        [HttpDelete]
        [Authorize(Roles = "Administrator, Teacher")]
        [Route("DeleteGrammarPointById")]
        public async Task<IActionResult> DeleteGrammarPointByIdAsync(int id)
        {
            await GrammarPointManager.DeleteGrammarPointById(_context, id);
            return Ok();
        }
    }
}
