﻿using System.Collections.Generic;
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
    public class DictionaryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public DictionaryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(Roles = "Administrator, Teacher")]
        [Route("GetDictionaries")]
        public async Task<IActionResult> GetDictionariesAsync()
        {
            IEnumerable<Dictionary> words = await DictionaryManager.GetDictionaries(_context);
            return Ok(words);
        }

        [HttpGet]
        [Authorize(Roles = "Administrator, Teacher")]
        [Route("GetDictionariesByPage")]
        public async Task<IActionResult> GetDictionariesByPageAsync(int page, int itemsPerPage)
        {
            IEnumerable<Dictionary> words = await DictionaryManager.GetDictionaries(_context, page, itemsPerPage);
            return Ok(words);
        }
    }
}