using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Metis.Models.Store;
using Microsoft.EntityFrameworkCore;

namespace Metis.Models.Managers
{
    public static class LessonManager
    {
        public static async Task AddLesson(ApplicationDbContext context, string description)
        {
            Lesson lesson = new Lesson { Description = description };
            context.Lessons.Add(lesson);
            await context.SaveChangesAsync();
        }
        public static async Task<Lesson> GetLessonById(ApplicationDbContext context, int id)
        {
            return await context.Lessons.FindAsync(id);
        }
        public static async Task<int> GetLessonsCount(ApplicationDbContext context)
        {
            return await context.Lessons.CountAsync();
        }
        public static async Task<int> GetLessonsBySearchQueryCount(ApplicationDbContext context, string searchQuery)
        {
            return await context.Lessons.Where(u => u.Description.Contains(searchQuery)).CountAsync();
        }
        public static async Task<IEnumerable<Lesson>> GetLessons(ApplicationDbContext context)
        {
            return await context.Lessons.ToListAsync();
        }
        public static async Task EditLesson(ApplicationDbContext context, int id, string description)
        {
            string lessonId = id.ToString();
            Lesson lesson = await context.Lessons.FindAsync(lessonId);
            if (lesson == null)
            {
                throw new Exception("User not found");
            }
            lesson.Description = description;
            context.Update(lesson);
            await context.SaveChangesAsync();
        }
        public static async Task DeleteLessonById(ApplicationDbContext context, int id)
        {
            var lessonToRemove = await context.Lessons.FindAsync(id);
            context.Lessons.Remove(lessonToRemove);
            await context.SaveChangesAsync();
        }
    
        public static async Task<IEnumerable<Lesson>> GetLessonsByPage(ApplicationDbContext context, int page, int itemsPerPage)
        {
            return await context.Lessons.Skip(page * itemsPerPage).Take(itemsPerPage).OrderBy(u => u.Id).ToListAsync();
        }
        public static async Task<IEnumerable<Lesson>> GetLessonsByPageAndSearchQuery(ApplicationDbContext context, int page, int itemsPerPage, string searchQuery)
        {
            return await context.Lessons.Where(u => u.Description.Contains(searchQuery)).Skip(page * itemsPerPage).Take(itemsPerPage).OrderBy(u => u.Id).ToListAsync();
        }
        // public static void SetDefaultLanguage(ApplicationDbContext context, int userId, int languageId)
        // {
        //     var user = context.Users.Where(u => u.Id == userId).FirstOrDefault();
        //     if (user != null)
        //     {
        //         user.LanguageId = languageId;
        //     }
        //     dataContext.Update(user);
        //     dataContext.SaveChanges();
        // }
    }
}