using System.Collections.Generic;
using System.Threading.Tasks;
using Metis.Models.Managers;
using Metis.Models.Store;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;


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
        public async Task<IActionResult> AddLesson(Lesson request)
        {
            if(request == null)
            {
                return NotFound();
            }
            Lesson newLesson = await LessonManager.AddLesson(_context, request);
            return Ok(newLesson);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetAllLessons")]
        public async Task<IActionResult> GetAllLessons()
        {
            IEnumerable<Lesson> lessons = await LessonManager.GetAllLesson(_context);
            return Ok(lessons);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetLessonById/{id}")]
        public async Task<IActionResult> GetLessonById(int request)
        {
            var lesson = await LessonManager.GetLessonById(_context, request);
            return Ok(lesson);
        }

        // [HttpPut("{id}")]
        // public IActionResult Update(int id, UpdateRequest model)
        // {
        //     LessonManager.Update(id, model);
        //     return Ok(new { message = "User updated" });
        // }

        [HttpDelete]
        [Route("RemoveLessonById/{id}")]
        public async Task<IActionResult> RemoveLessonById(int request)
        {
            await LessonManager.RemoveLessonById(_context, request);
            return Ok();
        }
    }
}
