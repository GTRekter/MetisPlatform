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
        [Route("AddWord")]
        public async Task<IActionResult> AddWord(Word word)
        {
            if(word == null)
            {
                return NotFound();
            }
            Word newWord = await DictionaryManager.AddWord(_context, word);
            return Ok(newWord);
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


        [HttpPost]
        [Route("AddWordType")]
        public async Task<IActionResult> AddWordType(WordType wordType)
        {
            if (wordType == null)
            {
                return NotFound();
            }
            WordType newWordType = await DictionaryManager.AddWordType(_context, wordType);
            return Ok(newWordType);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetAllWordTypes")]
        public async Task<IActionResult> GetAllWordTypes()
        {
            IEnumerable<WordType> words = await DictionaryManager.GetAllWordTypes(_context);
            return Ok(words);
        }

        [HttpPost]
        [Route("RemoveWordTypeById")]
        public async Task<IActionResult> RemoveWordTypeById([FromBody] int id)
        {
            await DictionaryManager.RemoveWordTypeById(_context, id);
            return Ok();
        }

        [HttpPost]
        [Route("AddDictionary")]
        public async Task<IActionResult> AddDictionary(Dictionary dictionary)
        {
            if (dictionary == null)
            {
                return NotFound();
            }
            Dictionary newDictionary = await DictionaryManager.AddDictionary(_context, dictionary);
            return Ok(newDictionary);
        }

        [HttpPost]
        [Route("RemoveDictionaryById")]
        public async Task<IActionResult> RemoveDictionaryById([FromBody] int id)
        {
            await DictionaryManager.RemoveDictionaryById(_context, id);
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
