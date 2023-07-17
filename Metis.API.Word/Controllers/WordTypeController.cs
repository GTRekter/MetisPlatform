using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Metis.API.Models;
using Metis.API.Models.Store;
using Metis.API.Models.Managers;

namespace Metis.API.Controllers
{
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("[controller]")]
    public class WordTypeController : ControllerBase
    {
        private readonly WordTypeManager _wordTypeManager;

        public WordTypeController(ApplicationDbContext dataContext)
        {
            _wordTypeManager = new WordTypeManager(dataContext);
        }
   
        [HttpPost]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("AddWordType")]
        public async Task<IActionResult> AddWordTypeAsync(WordType request)
        {
            if (request == null)
            {
                return NotFound();
            }
            WordType newWordType = await _wordTypeManager.AddWordTypeAsync(request);
            return Ok(newWordType);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]     
        [Route("GetAllWordTypes")]
        public async Task<IActionResult> GetAllWordTypesAsync()
        {
            IEnumerable<WordType> words = await _wordTypeManager.GetWordTypesAsync();
            return Ok(words);
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("RemoveWordTypeById")]
        public async Task<IActionResult> RemoveWordTypeById([FromBody] int request)
        {
            await _wordTypeManager.RemoveWordTypeByIdAsync(request);
            return Ok();
        }
    }
}
