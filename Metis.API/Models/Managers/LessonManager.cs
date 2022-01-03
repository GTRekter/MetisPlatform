using System;
using System.Linq;
using System.Transactions;
using System.Threading.Tasks;
using System.Collections.Generic;
using Metis.Models.Store;
using Microsoft.EntityFrameworkCore;

namespace Metis.Models.Managers
{
    public static class LessonManager
    {
        public static async Task AddLesson(ApplicationDbContext context, string title, string description, IEnumerable<int> words, IEnumerable<int> grammarPoints)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var wordsToAdd = await context.Words.Where(g => words.Contains(g.Id)).ToListAsync();
                var grammarPointsToAdd = await context.GrammarPoints.Where(g => grammarPoints.Contains(g.Id)).ToListAsync();
                Lesson lesson = new Lesson 
                { 
                    Title = title, 
                    Description = description,
                    GrammarPoints = grammarPointsToAdd,
                    Words = wordsToAdd
                };
                context.Lessons.Add(lesson);
                await context.SaveChangesAsync();
                scope.Complete();
            }
        }
        public static async Task<Lesson> GetLessonById(ApplicationDbContext context, int id)
        {
            return await context.Lessons
                .Include(l => l.GrammarPoints)
                .Include(l => l.Words)
                .FirstOrDefaultAsync(g => g.Id == id);
        }
        public static async Task<int> GetLessonsCount(ApplicationDbContext context)
        {
            return await context.Lessons.CountAsync();
        }
        public static async Task<int> GetLessonsBySearchQueryCount(ApplicationDbContext context, string searchQuery)
        {
            return await context.Lessons.Where(u => u.Title.Contains(searchQuery) || u.Description.Contains(searchQuery)).CountAsync();
        }
        public static async Task<IEnumerable<Lesson>> GetLessons(ApplicationDbContext context)
        {
            return await context.Lessons.ToListAsync();
        }
        public static async Task EditLesson(ApplicationDbContext context, int id,  string title, string description)
        {
            Lesson lesson = await context.Lessons.FindAsync(id);
            if (lesson == null)
            {
                throw new Exception("User not found");
            }
            lesson.Title = title; 
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
            return await context.Lessons.Where(u => u.Title.Contains(searchQuery) || u.Description.Contains(searchQuery)).Skip(page * itemsPerPage).Take(itemsPerPage).OrderBy(u => u.Id).ToListAsync();
        }
    }
}