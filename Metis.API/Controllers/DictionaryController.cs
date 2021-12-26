using System.Collections.Generic;
using System.Threading.Tasks;
using Metis.Models.Managers;
using Metis.Models.Store;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Metis.API.ViewModels;

namespace Metis.API.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class DictionaryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public DictionaryController(ApplicationDbContext context)
        {
            _context = context;
        }
   
        [HttpPost]
        [Route("AddDictionary")]
        public async Task<IActionResult> AddDictionary(Dictionary request)
        {
            if (request == null)
            {
                return NotFound();
            }
            Dictionary newDictionary = await DictionaryManager.AddDictionary(_context, request);
            return Ok(newDictionary);
        }

        [HttpPost]
        [Route("RemoveDictionaryById")]
        public async Task<IActionResult> RemoveDictionaryById([FromBody] int request)
        {
            await DictionaryManager.RemoveDictionaryById(_context, request);
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetAllDictionaries")]
        public async Task<IActionResult> GetAllDictionaries()
        {
            IEnumerable<Dictionary> words = await DictionaryManager.GetAllDictionary(_context);
            return Ok(words);
        }
    }
}