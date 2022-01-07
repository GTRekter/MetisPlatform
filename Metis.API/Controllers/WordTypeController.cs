using System.Collections.Generic;
using System.Threading.Tasks;
using Metis.Models.Managers;
using Metis.Models.Store;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Metis.API.Models;

namespace Metis.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class WordTypeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public WordTypeController(ApplicationDbContext context)
        {
            _context = context;
        }
   
        [HttpPost]
        [Authorize(Roles = "Administrator, Teacher")]
        [Route("AddWordType")]
        public async Task<IActionResult> AddWordTypeAsync(WordType request)
        {
            if (request == null)
            {
                return NotFound();
            }
            WordType newWordType = await WordTypeManager.AddWordType(_context, request);
            return Ok(newWordType);
        }

        [HttpGet]
        [Authorize]
        [Route("GetAllWordTypes")]
        public async Task<IActionResult> GetAllWordTypesAsync()
        {
            IEnumerable<WordType> words = await WordTypeManager.GetWordTypes(_context);
            return Ok(words);
        }

        [HttpPost]
        [Authorize(Roles = "Administrator, Teacher")]
        [Route("RemoveWordTypeById")]
        public async Task<IActionResult> RemoveWordTypeById([FromBody] int request)
        {
            await WordTypeManager.RemoveWordTypeById(_context, request);
            return Ok();
        }
    }
}
