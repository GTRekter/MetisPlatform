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
    public class WordController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public WordController(ApplicationDbContext context)
        {
            _context = context;
        }
   
        [HttpPost]
        [Route("AddWord")]
        public async Task<IActionResult> AddWord(Word request)
        {
            if(request == null)
            {
                return NotFound();
            }
            Word newWord = await WordManager.AddWord(_context, request);
            return Ok(newWord);
        }

        [HttpPost]
        [Route("AddWordWithTranslations")]
        public async Task<IActionResult> AddWordWithTranslations([FromBody]AddWordWithTranslationsRequest request)
        {
            if(request == null)
            {
                return NotFound();
            }
            Word newWord = await WordManager.AddWordWithTranslations(_context, request.Word, request.Translations);
            return Ok(newWord);
        }

        [HttpPost]
        [Route("RemoveWordById")]
        public async Task<IActionResult> RemoveWordById(int request)
        {
            await WordManager.RemoveWordById(_context, request);
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetWordsCount")]
        public async Task<IActionResult> GetWordsCount()
        {
            int counter = await WordManager.GetWordsCount(_context);
            return Ok(counter);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetWords")]
        public async Task<IActionResult> GetWords()
        {
            IEnumerable<Word> words = await WordManager.GetWords(_context);
            return Ok(words);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetWordsWithTranslationsByPage")]
        public async Task<IActionResult> GetWordsWithTranslationsByPage(int page, int itemsPerPage)
        {
            IEnumerable<Word> words = await WordManager.GetWordsWithTranslationsByPage(_context, page, itemsPerPage);
            return Ok(words);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetWord")]
        public async Task<IActionResult> GetWord(int request)
        {
            var word = await WordManager.GetWordById(_context, request);
            return Ok(word);
        }
    }
}