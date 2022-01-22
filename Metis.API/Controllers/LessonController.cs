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
        private readonly ApplicationDbContext _dataContext;
        public LessonController(ApplicationDbContext dataContext)
        {
            _dataContext = dataContext;
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
            await LessonManager.AddLessonAsync(_dataContext, request.Title, request.LanguageId, request.Description, request.Words.Select(w => w.Id), request.GrammarPoints.Select(g => g.Id));
            return Ok();
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("EditLesson")]
        public async Task<IActionResult> EditLessonAsync(EditLessonRequest request)
        {
            await LessonManager.EditLessonAsync(_dataContext, request.Id, request.Title, request.LanguageId, request.Description, request.Words.Select(w => w.Id), request.GrammarPoints.Select(g => g.Id));
            return Ok();
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("DeleteLessonById")]
        public async Task<IActionResult> DeleteLessonByIdAsync(int id)
        {
            await LessonManager.DeleteLessonByIdAsync(_dataContext, id);
            return Ok();
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetLessons")]
        public async Task<IActionResult> GetLessonsAsync()
        {
            IEnumerable<Lesson> lessons = await LessonManager.GetLessonsAsync(_dataContext);
            return Ok(lessons);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetLessonsByCurrentUser")]
        public async Task<IActionResult> GetLessonsByCurrentUserAsync()
        {
            var user = await UserManager.GetUserByEmailAsync(_dataContext, User.Claims.FirstOrDefault(c => c.Type == "username").Value);
            IEnumerable<Lesson> lessons = await LessonManager.GetLessonsAsync(_dataContext, user.Id);
            return Ok(lessons);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetLessonsByLanguageId")]
        public async Task<IActionResult> GetLessonsByLanguageIdAsync(int id)
        {
            var lesson = await LessonManager.GetLessonsByLanguageIdAsync(_dataContext, id);
            return Ok(lesson);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetLessonById")]
        public async Task<IActionResult> GetLessonByIdAsync(int id)
        {
            var lesson = await LessonManager.GetLessonByIdAsync(_dataContext, id);
            return Ok(lesson);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetLessonsByPage")]
        public async Task<IActionResult> GetUsersByPageAsync(int page, int itemsPerPage)
        {
            IEnumerable<Lesson> lessons = await LessonManager.GetLessonsByPageAsync(_dataContext, page, itemsPerPage);
            return Ok(lessons);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetLessonsByCurrentUserAndPage")]
        public async Task<IActionResult> GetLessonsByCurrentUserAndPageAsync(int page, int itemsPerPage)
        {
            var user = await UserManager.GetUserByEmailAsync(_dataContext, User.Claims.FirstOrDefault(c => c.Type == "username").Value);
            IEnumerable<Lesson> lessons = await LessonManager.GetLessonsByPageAsync(_dataContext, user.Id, page, itemsPerPage);
            return Ok(lessons);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetLessonsByPageAndSearchQuery")]
        public async Task<IActionResult> GetLessonsByPageAndSearchQueryAsync(int page, int itemsPerPage, string searchQuery)
        {
            IEnumerable<Lesson> lessons = await LessonManager.GetLessonsByPageAsync(_dataContext, page, itemsPerPage, searchQuery);
            return Ok(lessons);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetLessonsByCurrentUserAndPageAndSearchQuery")]
        public async Task<IActionResult> GetLessonsByCurrentUserAndPageAndSearchQueryAsync(int page, int itemsPerPage, string searchQuery)
        {
            var user = await UserManager.GetUserByEmailAsync(_dataContext, User.Claims.FirstOrDefault(c => c.Type == "username").Value);
            IEnumerable<Lesson> lessons = await LessonManager.GetLessonsByPageAsync(_dataContext, user.Id, page, itemsPerPage, searchQuery);
            return Ok(lessons);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetLessonsCount")]
        public async Task<IActionResult> GetLessonsCountAsync()
        {
            int counter = await LessonManager.GetLessonsCountAsync(_dataContext);
            return Ok(counter);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetLessonsByCurrentUserCount")]
        public async Task<IActionResult> GetLessonsByCurrentUserCountAsync()
        {
            var user = await UserManager.GetUserByEmailAsync(_dataContext, User.Claims.FirstOrDefault(c => c.Type == "username").Value);
            int counter = await LessonManager.GetLessonsCountAsync(_dataContext, user.Id);
            return Ok(counter);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetLessonsBySearchQueryCount")]
        public async Task<IActionResult> GetLessonsBySearchQueryCountAsync(string searchQuery)
        {
            int counter = await LessonManager.GetLessonsCountAsync(_dataContext, searchQuery);
            return Ok(counter);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetLessonsByCurrentUserAndSearchQueryCount")]
        public async Task<IActionResult> GetLessonsByCurrentUserAndSearchQueryCountAsync(string searchQuery)
        {
            var user = await UserManager.GetUserByEmailAsync(_dataContext, User.Claims.FirstOrDefault(c => c.Type == "username").Value);
            int counter = await LessonManager.GetLessonsCountAsync(_dataContext, user.Id, searchQuery);
            return Ok(counter);
        }
    }
}
