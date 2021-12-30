using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Metis.Models.Store;
using Microsoft.EntityFrameworkCore;

namespace Metis.Models.Managers
{
    public static class LessonManager
    {
        public static async Task<Lesson> AddLesson(ApplicationDbContext context, Lesson lesson)
        {
            context.Lessons.Add(lesson);
            await context.SaveChangesAsync();
            return lesson;
        }
        public static async Task<Lesson> GetLessonById(ApplicationDbContext context, int id)
        {
            return await context.Lessons.FindAsync(id);
        }
        public static async Task<IEnumerable<Lesson>> GetLessons(ApplicationDbContext context)
        {
            return await context.Lessons.ToListAsync();
        }
        public static async Task RemoveLessonById(ApplicationDbContext context, int id)
        {
            var lessonToRemove = await context.Lessons.FindAsync(id);
            context.Lessons.Remove(lessonToRemove);
            await context.SaveChangesAsync();
        }
    }
}