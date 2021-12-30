using System.Collections.Generic;
using System.Threading.Tasks;
using Metis.Models.Managers;
using Metis.Models.Store;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;


namespace Metis.API.Controllers
{
    //[Authorize]
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
        [Route("AddGrammarPoint")]
        public async Task<IActionResult> AddGrammarPointAsync(GrammarPoint request)
        {
            if(request == null)
            {
                return NotFound();
            }
            GrammarPoint newGrammarPoint = await GrammarPointManager.AddGrammarPoint(_context, request);
            return Ok(newGrammarPoint);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetGrammarPoints")]
        public async Task<IActionResult> GetGrammarPointsAsync()
        {
            IEnumerable<GrammarPoint> GrammarPoints = await GrammarPointManager.GetGrammarPoints(_context);
            return Ok(GrammarPoints);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetGrammarPointById/{id}")]
        public async Task<IActionResult> GetGrammarPointByIdAsync(int request)
        {
            var GrammarPoint = await GrammarPointManager.GetGrammarPointById(_context, request);
            return Ok(GrammarPoint);
        }

        // [HttpPut("{id}")]
        // public IActionResult Update(int id, UpdateRequest model)
        // {
        //     GrammarPointManager.Update(id, model);
        //     return Ok(new { message = "User updated" });
        // }

        [HttpDelete]
        [Route("RemoveGrammarPointById/{id}")]
        public async Task<IActionResult> RemoveGrammarPointByIdAsync(int request)
        {
            await GrammarPointManager.RemoveGrammarPointById(_context, request);
            return Ok();
        }
    }
}
