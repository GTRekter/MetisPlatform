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
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
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
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("AddWord")]
        public async Task<IActionResult> AddWordAsync(AddWordRequest request)
        {
            if (request == null)
            {
                return NotFound();
            }
            await WordManager.AddWord(_context, request.Text, request.Romanization, request.DictionaryId, request.WordTypeId, request.Description, request.Example, request.Translations.Select(t => new KeyValuePair<int,string>(t.DictionaryId, t.Text)));
            return Ok();
        }
        
        [HttpPost]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("EditWord")]
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
            await WordManager.EditWord(_context, request.Id, request.Text, request.Romanization, request.DictionaryId, request.WordTypeId, request.Description, request.Example, translationsToAdd, translationsToEdit);
            return Ok();
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("DeleteWordById")]
        public async Task<IActionResult> DeleteWordByIdAsync(int id)
        {
            await WordManager.DeleteWordById(_context, id);
            return Ok();
        }


        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWords")]
        public async Task<IActionResult> GetWordsAsync()
        {
            IEnumerable<Word> words = await WordManager.GetWords(_context);
            return Ok(words);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByDictionaryId")]
        public async Task<IActionResult> GetWordsByDictionaryIdAsync(int id)
        {
            IEnumerable<Word> words = await WordManager.GetWordsByDictionaryId(_context, id);
            return Ok(words);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByUserId")]
        public async Task<IActionResult> GetWordsByUserIdAsync(int id)
        {
            IEnumerable<Word> words = await WordManager.GetWordsByUserId(_context, id);
            return Ok(words);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByUserIdAndWordTypeId")]
        public async Task<IActionResult> GetWordsByUserIdAndWordTypeIdAsync(int id, int wordTypeId)
        {
            IEnumerable<Word> words = await WordManager.GetWordsByUserIdAndWordTypeId(_context, id, wordTypeId);
            return Ok(words);
        }   

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordById")]
        public async Task<IActionResult> GetWordByIdAsync(int id)
        {
            var word = await WordManager.GetWordById(_context, id);
            return Ok(word);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByPage")]
        public async Task<IActionResult> GetWordsByPageAsync(int page, int itemsPerPage)
        {
            IEnumerable<Word> words = await WordManager.GetWordsByPage(_context, page, itemsPerPage);
            return Ok(words);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByUserIdAndPage")]
        public async Task<IActionResult> GetWordsByUserIdAndPageAsync(int id, int page, int itemsPerPage)
        {
            IEnumerable<Word> words = await WordManager.GetWordsByUserIdAndPage(_context, id, page, itemsPerPage);
            return Ok(words);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByPageAndSearchQuery")]
        public async Task<IActionResult> GetWordsByPageAndSearchQueryAsync(int page, int itemsPerPage, string searchQuery)
        {
            IEnumerable<Word> words = await WordManager.GetWordsByPageAndSearchQuery(_context, page, itemsPerPage, searchQuery);
            return Ok(words);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByUserIdAndPageAndSearchQuery")]
        public async Task<IActionResult> GetWordsByUserIdAndPageAndSearchQueryAsync(int id, int page, int itemsPerPage, string searchQuery)
        {
            IEnumerable<Word> words = await WordManager.GetWordsByUserIdAndPageAndSearchQuery(_context, id, page, itemsPerPage, searchQuery);
            return Ok(words);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsCount")]
        public async Task<IActionResult> GetWordsCountAsync()
        {
            int counter = await WordManager.GetWordsCount(_context);
            return Ok(counter);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByUserIdCount")]
        public async Task<IActionResult> GetWordsByUserIdCountAsync(int id)
        {
            int counter = await WordManager.GetWordsByUserIdCount(_context, id);
            return Ok(counter);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsBySearchQueryCount")]
        public async Task<IActionResult> GetWordsBySearchQueryCountAsync(string searchQuery)
        {
            int counter = await WordManager.GetWordsBySearchQueryCount(_context, searchQuery);
            return Ok(counter);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByUserIdAndSearchQueryCount")]
        public async Task<IActionResult> GetWordsByUserIdAndSearchQueryCountAsync(int id, string searchQuery)
        {
            int counter = await WordManager.GetWordsByUserIdAndSearchQueryCount(_context, id, searchQuery);
            return Ok(counter);
        }
    }
}