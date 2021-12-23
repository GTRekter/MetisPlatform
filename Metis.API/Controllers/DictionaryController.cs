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
    public class DictionaryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public DictionaryController(ApplicationDbContext context)
        {
            _context = context;
        }
   
        [HttpPost]
        [Route("AddProduct")]
        public async Task<IActionResult> AddWord(Word word)
        {
            if(word == null)
            {
                return NotFound();
            }
            await DictionaryManager.AddWord(_context, word);
            return Ok();
        }

        [HttpPost]
        [Route("RemoveWordById")]
        public async Task<IActionResult> RemoveWordById(int id)
        {
            await DictionaryManager.RemoveWordById(_context, id);
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetAllWords")]
        public async Task<IActionResult> GetAllWords()
        {
            IEnumerable<Word> words = await DictionaryManager.GetAllWord(_context);
            return Ok(words);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetWord")]
        public async Task<IActionResult> GetWord(int id)
        {
            var word = await DictionaryManager.GetWordById(_context, id);
            return Ok(word);
        }




        [AllowAnonymous]
        [HttpGet]
        [Route("GetAllWordTypes")]
        public async Task<IActionResult> GetAllWordTypes()
        {
            IEnumerable<WordType> words = await DictionaryManager.GetAllWordTypes(_context);
            return Ok(words);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetAllLanguages")]
        public async Task<IActionResult> GetAllLanguages()
        {
            IEnumerable<Language> words = await DictionaryManager.GetAllLanguage(_context);
            return Ok(words);
        }
    }
}
