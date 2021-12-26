﻿using System.Collections.Generic;
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
    public class WordTypeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public WordTypeController(ApplicationDbContext context)
        {
            _context = context;
        }
   
        [HttpPost]
        [Route("AddWordType")]
        public async Task<IActionResult> AddWordType(WordType request)
        {
            if (request == null)
            {
                return NotFound();
            }
            WordType newWordType = await DictionaryManager.AddWordType(_context, request);
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
        public async Task<IActionResult> RemoveWordTypeById([FromBody] int request)
        {
            await DictionaryManager.RemoveWordTypeById(_context, request);
            return Ok();
        }
    }
}
