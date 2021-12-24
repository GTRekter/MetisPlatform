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

        [HttpPost]
        [Route("RemoveLessonById")]
        public async Task<IActionResult> RemoveLessonById(int request)
        {
            await LessonManager.RemoveLessonById(_context, request);
            return Ok();
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
        [Route("GetLesson")]
        public async Task<IActionResult> GetLesson(int request)
        {
            var lesson = await LessonManager.GetLessonById(_context, request);
            return Ok(lesson);
        }

        // [AllowAnonymous]
        // [HttpGet]
        // [Route("GetLesson")]
        // public async Task<IActionResult> AddWordToLesson(int idWord, int idLesson)
        // {
        //     var lesson = await LessonManager.AddWordToLesson(_context, id);
        //     return Ok(lesson);
        // }
    }
}
