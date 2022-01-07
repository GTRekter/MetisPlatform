using System.Linq;
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
    public class WordController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public WordController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize(Roles = "Administrator, Teacher")]
        [Route("AddWord")]
        public async Task<IActionResult> AddWordAsync(AddWordRequest request)
        {
            if (request == null)
            {
                return NotFound();
            }
            await WordManager.AddWord(_context, request.Text, request.Romanization, request.Description, request.Example, request.Translations.Select(t => new KeyValuePair<int,string>(t.DictionaryId, t.Text)));
            return Ok();
        }

        [HttpGet]
        [Authorize]
        [Route("GetWords")]
        public async Task<IActionResult> GetWordsAsync()
        {
            IEnumerable<Word> words = await WordManager.GetWords(_context);
            return Ok(words);
        }
        
        [HttpGet]
        [Authorize]
        [Route("GetWordById")]
        public async Task<IActionResult> GetWordByIdAsync(int id)
        {
            var word = await WordManager.GetWordById(_context, id);
            return Ok(word);
        }

        [HttpGet]
        [Authorize]
        [Route("GetWordsByPage")]
        public async Task<IActionResult> GetWordsByPageAsync(int page, int itemsPerPage)
        {
            IEnumerable<Word> words = await WordManager.GetWordsByPage(_context, page, itemsPerPage);
            return Ok(words);
        }

        [HttpGet]
        [Authorize]
        [Route("GetWordsByPageAndSearchQuery")]
        public async Task<IActionResult> GetWordsByPageAndSearchQueryAsync(int page, int itemsPerPage, string searchQuery)
        {
            IEnumerable<Word> words = await WordManager.GetWordsByPageAndSearchQuery(_context, page, itemsPerPage, searchQuery);
            return Ok(words);
        }

        [HttpGet]
        [Authorize]
        [Route("GetWordsCount")]
        public async Task<IActionResult> GetWordsCountAsync()
        {
            int counter = await WordManager.GetWordsCount(_context);
            return Ok(counter);
        }

        [HttpGet]
        [Authorize]
        [Route("GetWordsBySearchQueryCount")]
        public async Task<IActionResult> GetWordsBySearchQueryCountAsync(string searchQuery)
        {
            int counter = await WordManager.GetWordsBySearchQueryCount(_context, searchQuery);
            return Ok(counter);
        }

        [HttpPost]
        [Authorize(Roles = "Administrator, Teacher")]
        [Route("EditWord")]
        // [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditWordAsync(EditWordRequest request)
        {
            if (request == null)
            {
                return NotFound();
            }
            var translationsToAdd = new List<KeyValuePair<int, string>>();
            var translationsToEdit = new List<KeyValuePair<int, string>>();
            foreach (var translation in request.Translations)
            {
                if (translation.Id == null)
                {
                    translationsToAdd.Add(new KeyValuePair<int, string>(translation.DictionaryId, translation.Text));
                }
                else
                {
                    translationsToEdit.Add(new KeyValuePair<int, string>((int)translation.Id, translation.Text));
                }
            }    
            await WordManager.EditWord(_context, request.Id, request.Text, request.Romanization, request.Description, request.Example, translationsToAdd, translationsToEdit);
            return Ok();
        }

        [HttpDelete]
        [Authorize(Roles = "Administrator, Teacher")]
        [Route("DeleteWordById")]
        public async Task<IActionResult> DeleteWordByIdAsync(int id)
        {
            await WordManager.DeleteWordById(_context, id);
            return Ok();
        }
    }
}