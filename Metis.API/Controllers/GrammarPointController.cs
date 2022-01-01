﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Metis.Models.Managers;
using Metis.Models.Store;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Metis.Models.Requests;

namespace Metis.API.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class GrammarPointController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public GrammarPointController(ApplicationDbContext context)
        {
            _context = context;
        }
        
        [HttpPost]
        [Route("AddGrammarPoint")]
        public async Task<IActionResult> AddGrammarPointAsync(AddGrammarPointRequest request)
        {
            if (request == null)
            {
                return NotFound();
            }
            await GrammarPointManager.AddGrammarPoint(_context, request.Title, request.Description);
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetGrammarPoints")]
        public async Task<IActionResult> GetGrammarPointsAsync()
        {
            IEnumerable<GrammarPoint> grammarPoints = await GrammarPointManager.GetGrammarPoints(_context);
            return Ok(grammarPoints);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetGrammarPointById")]
        public async Task<IActionResult> GetGrammarPointByIdAsync(int id)
        {
            var grammarPoint = await GrammarPointManager.GetGrammarPointById(_context, id);
            return Ok(grammarPoint);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetGrammarPointsByPage")]
        public async Task<IActionResult> GetUsersByPageAsync(int page, int itemsPerPage)
        {
            IEnumerable<GrammarPoint> grammarPoints = await GrammarPointManager.GetGrammarPointsByPage(_context, page, itemsPerPage);
            return Ok(grammarPoints);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetGrammarPointsByPageAndSearchQuery")]
        public async Task<IActionResult> GetGrammarPointsByPageAndSearchQueryAsync(int page, int itemsPerPage, string searchQuery)
        {
            IEnumerable<GrammarPoint> grammarPoints = await GrammarPointManager.GetGrammarPointsByPageAndSearchQuery(_context, page, itemsPerPage, searchQuery);
            return Ok(grammarPoints);
        }

        [HttpGet]
        [Route("GetGrammarPointsCount")]
        // [Authorize(Roles = "Country Admin,Administrator")]
        public async Task<IActionResult> GetGrammarPointsCountAsync()
        {
            // await IsUserValidAsync(new string[] { "Country Admin", "Administrator" });
            int counter = await GrammarPointManager.GetGrammarPointsCount(_context);
            return Ok(counter);
        }

        [HttpGet]
        [Route("GetGrammarPointsBySearchQueryCount")]
        // [Authorize(Roles = "Country Admin,Administrator")]
        public async Task<IActionResult> GetGrammarPointsBySearchQueryCountAsync(string searchQuery)
        {
            // await IsUserValidAsync(new string[] { "Country Admin", "Administrator" });
            int counter = await GrammarPointManager.GetGrammarPointsBySearchQueryCount(_context, searchQuery);
            return Ok(counter);
        }

        [HttpPost]
        [Route("EditGrammarPoint")]
        // [Authorize(Roles = "Country Admin,Administrator")]
        // [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditGrammarPointAsync(EditGrammarPointRequest model)
        {
            // await IsUserValidAsync(new string[] { "Country Admin", "Administrator" });
            await GrammarPointManager.EditGrammarPoint(_context, model.Id, model.Title, model.Description);
            return Ok();
        }

        // [HttpPut("{id}")]
        // public IActionResult Update(int id, UpdateRequest model)
        // {
        //     GrammarPointManager.Update(id, model);
        //     return Ok(new { message = "User updated" });
        // }

        [HttpDelete]
        [Route("DeleteGrammarPointById")]
        public async Task<IActionResult> DeleteGrammarPointByIdAsync(int id)
        {
            await GrammarPointManager.DeleteGrammarPointById(_context, id);
            return Ok();
        }
    }
}
