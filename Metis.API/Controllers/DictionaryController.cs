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

        [AllowAnonymous]
        [HttpGet]
        [Route("GetDictionaries")]
        public async Task<IActionResult> GetDictionaries()
        {
            IEnumerable<Dictionary> words = await DictionaryManager.GetDictionary(_context, false);
            return Ok(words);
        }
                
        [AllowAnonymous]
        [HttpGet]
        [Route("GetDictionariesByPage")]
        public async Task<IActionResult> GetDictionariesByPage(int page, int itemsPerPage)
        {
            IEnumerable<Dictionary> words = await DictionaryManager.GetDictionary(_context, false, page, itemsPerPage);
            return Ok(words);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetDictionariesCount")]
        public async Task<IActionResult> GetDictionariesCount()
        {
            int counter = await DictionaryManager.GetDictionariesCount(_context, false);
            return Ok(counter);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetEnabledDictionaries")]
        public async Task<IActionResult> GetEnabledDictionaries()
        {
            IEnumerable<Dictionary> words = await DictionaryManager.GetDictionary(_context, true);
            return Ok(words);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetEnabledDictionariesByPage")]
        public async Task<IActionResult> GetEnabledDictionariesByPage(int page, int itemsPerPage)
        {
            IEnumerable<Dictionary> words = await DictionaryManager.GetDictionary(_context, true, page, itemsPerPage);
            return Ok(words);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetEnabledDictionariesCount")]
        public async Task<IActionResult> GetEnabledDictionariesCount()
        {
            int counter = await DictionaryManager.GetDictionariesCount(_context, true);
            return Ok(counter);
        }
    }
}