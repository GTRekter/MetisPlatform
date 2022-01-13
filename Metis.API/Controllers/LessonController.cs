using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Metis.Models.Store;
using Metis.Models.Requests;
using Metis.Models.Managers;
using Metis.Models;

namespace Metis.API.Controllers
{
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("[controller]")]
    public class LessonController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public LessonController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("AddLesson")]
        public async Task<IActionResult> AddLessonAsync(AddLessonRequest request)
        {
            if (request == null)
            {
                return NotFound();
            }
            await LessonManager.AddLessonAsync(_context, request.Title, request.LanguageId, request.Description, request.Words.Select(w => w.Id), request.GrammarPoints.Select(g => g.Id));
            return Ok();
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("EditLesson")]
        public async Task<IActionResult> EditLessonAsync(EditLessonRequest request)
        {
            await LessonManager.EditLessonAsync(_context, request.Id, request.Title, request.LanguageId, request.Description, request.Words.Select(w => w.Id), request.GrammarPoints.Select(g => g.Id));
            return Ok();
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("DeleteLessonById")]
        public async Task<IActionResult> DeleteLessonByIdAsync(int id)
        {
            await LessonManager.DeleteLessonByIdAsync(_context, id);
            return Ok();
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetLessons")]
        public async Task<IActionResult> GetLessonsAsync()
        {
            IEnumerable<Lesson> lessons = await LessonManager.GetLessonsAsync(_context);
            return Ok(lessons);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetLessonsByLanguageId")]
        public async Task<IActionResult> GetLessonsByLanguageIdAsync(int id)
        {
            var lesson = await LessonManager.GetLessonsByLanguageIdAsync(_context, id);
            return Ok(lesson);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetLessonById")]
        public async Task<IActionResult> GetLessonByIdAsync(int id)
        {
            var lesson = await LessonManager.GetLessonByIdAsync(_context, id);
            return Ok(lesson);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetLessonsByPage")]
        public async Task<IActionResult> GetUsersByPageAsync(int page, int itemsPerPage)
        {
            IEnumerable<Lesson> lessons = await LessonManager.GetLessonsByPageAsync(_context, page, itemsPerPage);
            return Ok(lessons);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetLessonsByPageAndSearchQuery")]
        public async Task<IActionResult> GetLessonsByPageAndSearchQueryAsync(int page, int itemsPerPage, string searchQuery)
        {
            IEnumerable<Lesson> lessons = await LessonManager.GetLessonsByPageAsync(_context, page, itemsPerPage, searchQuery);
            return Ok(lessons);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetLessonsCount")]
        public async Task<IActionResult> GetLessonsCountAsync()
        {
            int counter = await LessonManager.GetLessonsCountAsync(_context);
            return Ok(counter);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetLessonsBySearchQueryCount")]
        public async Task<IActionResult> GetLessonsBySearchQueryCountAsync(string searchQuery)
        {
            int counter = await LessonManager.GetLessonsCountAsync(_context, searchQuery);
            return Ok(counter);
        }
    }
}
