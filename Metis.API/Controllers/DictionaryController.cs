using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Metis.Models.Managers;
using Metis.Models.Store;

namespace Metis.API.Controllers
{
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
        public void AddWord(Word word)
        {
            DictionaryManager.AddWord(_context, word);
        }

        [HttpPost]
        [Route("RemoveWordById")]
        public void RemoveWordById(int id)
        {
            DictionaryManager.RemoveWordById(_context, id);
        }

        [HttpGet]
        [Route("GetAllWords")]
        public IEnumerable<Word> GetAllWords()
        {
            return DictionaryManager.GetAllWord(_context);
        }

        [HttpGet]
        [Route("GetWord")]
        public Word GetWord(int id)
        {
            return DictionaryManager.GetWordById(_context, id);
        }
    }
}
