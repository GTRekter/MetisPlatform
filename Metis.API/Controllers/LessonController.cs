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
    //[Authorize]
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
        [Route("AddLesson")]
        public async Task<IActionResult> AddLessonAsync(AddLessonRequest request)
        {
            if (request == null)
            {
                return NotFound();
            }
            await LessonManager.AddLesson(_context, request.Description);
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetLessons")]
        public async Task<IActionResult> GetLessonsAsync()
        {
            IEnumerable<Lesson> lessons = await LessonManager.GetLessons(_context);
            return Ok(lessons);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetLessonById")]
        public async Task<IActionResult> GetLessonByIdAsync(int id)
        {
            var lesson = await LessonManager.GetLessonById(_context, id);
            return Ok(lesson);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetLessonsByPage")]
        public async Task<IActionResult> GetUsersByPageAsync(int page, int itemsPerPage)
        {
            IEnumerable<Lesson> lessons = await LessonManager.GetLessonsByPage(_context, page, itemsPerPage);
            return Ok(lessons);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetLessonsByPageAndSearchQuery")]
        public async Task<IActionResult> GetLessonsByPageAndSearchQueryAsync(int page, int itemsPerPage, string searchQuery)
        {
            IEnumerable<Lesson> lessons = await LessonManager.GetLessonsByPageAndSearchQuery(_context, page, itemsPerPage, searchQuery);
            return Ok(lessons);
        }

        [HttpGet]
        [Route("GetLessonsCount")]
        // [Authorize(Roles = "Country Admin,Administrator")]
        public async Task<IActionResult> GetLessonsCountAsync()
        {
            // await IsUserValidAsync(new string[] { "Country Admin", "Administrator" });
            int counter = await LessonManager.GetLessonsCount(_context);
            return Ok(counter);
        }

        [HttpGet]
        [Route("GetLessonsBySearchQueryCount")]
        // [Authorize(Roles = "Country Admin,Administrator")]
        public async Task<IActionResult> GetLessonsBySearchQueryCountAsync(string searchQuery)
        {
            // await IsUserValidAsync(new string[] { "Country Admin", "Administrator" });
            int counter = await LessonManager.GetLessonsBySearchQueryCount(_context, searchQuery);
            return Ok(counter);
        }

        [HttpPost]
        [Route("EditUser")]
        // [Authorize(Roles = "Country Admin,Administrator")]
        // [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditLessonAsync(EditLessonRequest model)
        {
            // await IsUserValidAsync(new string[] { "Country Admin", "Administrator" });
            await LessonManager.EditLesson(_context, model.Id, model.Description);
            return Ok();
        }

        // [HttpPut("{id}")]
        // public IActionResult Update(int id, UpdateRequest model)
        // {
        //     LessonManager.Update(id, model);
        //     return Ok(new { message = "User updated" });
        // }

        [HttpDelete]
        [Route("RemoveLessonById")]
        public async Task<IActionResult> DeleteLessonByIdAsync(int id)
        {
            await LessonManager.DeleteLessonById(_context, id);
            return Ok();
        }
    }
}
