using System.Collections.Generic;
using System.Threading.Tasks;
using Metis.Models.Managers;
using Metis.Models.Store;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Metis.API.Models;

namespace Metis.API.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class WordController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public WordController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("AddWord")]
        public async Task<IActionResult> AddWordAsync([FromBody]Word word)
        {
            if(word == null)
            {
                return NotFound();
            }
            Word newWord = await WordManager.AddWord(_context, word);
            return Ok(newWord);
        }
        
        [AllowAnonymous]
        [HttpGet]
        [Route("GetWords")]
        public async Task<IActionResult> GetWordsAsync()
        {
            IEnumerable<Word> words = await WordManager.GetWords(_context);
            return Ok(words);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetWordsWithTranslationsByPage")]
        public async Task<IActionResult> GetWordsByPageAsync(int page, int itemsPerPage)
        {
            IEnumerable<Word> words = await WordManager.GetWordsByPage(_context, page, itemsPerPage);
            return Ok(words);
        }

        [HttpDelete]
        [Route("RemoveWordById/{id}")]    
        public async Task<IActionResult> RemoveWordByIdAsync(int id)
        {
            await WordManager.RemoveWordById(_context, id);
            return Ok();
        }
    }
}