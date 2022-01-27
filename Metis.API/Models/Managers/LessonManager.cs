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
        public static async Task AddLessonAsync(ApplicationDbContext dataContext, string title, int languageId, string description, IEnumerable<int> words, IEnumerable<int> grammarPoints)
        {
            var wordsToAdd = await dataContext.Words.Where(g => words.Contains(g.Id)).ToListAsync();
            var grammarPointsToAdd = await dataContext.GrammarPoints.Where(g => grammarPoints.Contains(g.Id)).ToListAsync();
            Lesson lesson = new Lesson
            {
                Title = title,
                Description = description,
                Language = await dataContext.Languages.FindAsync(languageId),
                GrammarPoints = grammarPointsToAdd,
                Words = wordsToAdd
            };
            dataContext.Lessons.Add(lesson);
            await dataContext.SaveChangesAsync();
        }
        public static async Task EditLessonAsync(ApplicationDbContext dataContext, int id, string title, int languageId, string description, IEnumerable<int> words, IEnumerable<int> grammarPoints)
        {
            Lesson lesson = await dataContext.Lessons
                .Include(l => l.Words)
                .Include(l => l.GrammarPoints)
                .FirstOrDefaultAsync(l => l.Id == id);
            if (lesson == null)
            {
                throw new Exception("User not found");
            }
            foreach (var word in lesson.Words)
            {
                if (!words.Contains(word.Id))
                {
                    lesson.Words.Remove(word);
                }
            }
            foreach (var word in words)
            {
                if (!lesson.Words.Any(w => w.Id == word))
                {
                    var wordToAdd = await dataContext.Words.FirstOrDefaultAsync(w => w.Id == word);
                    lesson.Words.Add(wordToAdd);
                }
            }
            foreach (var grammarPoint in lesson.GrammarPoints)
            {
                if (!grammarPoints.Contains(grammarPoint.Id))
                {
                    lesson.GrammarPoints.Remove(grammarPoint);
                }
            }
            foreach (var grammarPoint in grammarPoints)
            {
                if (!lesson.GrammarPoints.Any(w => w.Id == grammarPoint))
                {
                    var grammarPointToAdd = await dataContext.GrammarPoints.FirstOrDefaultAsync(w => w.Id == grammarPoint);
                    lesson.GrammarPoints.Add(grammarPointToAdd);
                }
            }
            lesson.Title = title;
            lesson.Description = description;
            lesson.Language = await dataContext.Languages.FindAsync(languageId);
            dataContext.Update(lesson);
            await dataContext.SaveChangesAsync();
        }
        public static async Task DeleteLessonByIdAsync(ApplicationDbContext dataContext, int id)
        {
            var lessonToRemove = await dataContext.Lessons.FindAsync(id);
            dataContext.Lessons.Remove(lessonToRemove);
            await dataContext.SaveChangesAsync();
        }

        public static async Task<int> GetLessonsCountAsync(ApplicationDbContext dataContext)
        {
            return await dataContext.Lessons
                .CountAsync();
        }
        public static async Task<int> GetLessonsCountAsync(ApplicationDbContext dataContext, string searchQuery)
        {
            return await dataContext.Lessons
                .Where(u => u.Title.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)
                    || u.Description.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase))
                .CountAsync();
        }
        public static async Task<int> GetLessonsCountAsync(ApplicationDbContext dataContext, int userId)
        {
            return await dataContext.Lessons
                .Include(l => l.Language)
                .Where(l => l.Users.Any(u => u.Id == userId))
                .CountAsync();
        }
       public static async Task<int> GetLessonsCountAsync(ApplicationDbContext dataContext,  int userId, string searchQuery)
        {
            return await dataContext.Lessons
                .Where(l => l.Users.Any(u => u.Id == userId))
                .Where(u => u.Title.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)
                    || u.Description.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase))
                .CountAsync();
        }

        public static async Task<IEnumerable<Lesson>> GetLessonsAsync(ApplicationDbContext dataContext)
        {
            return await dataContext.Lessons
                .Include(l => l.Language)
                .ToListAsync();
        }        
        public static async Task<IEnumerable<Lesson>> GetLessonsAsync(ApplicationDbContext dataContext, int userId)
        {
            return await dataContext.Lessons
                .Include(l => l.Language)
                .Where(l => l.Users.Any(u => u.Id == userId))
                .ToListAsync();
        }
        public static async Task<Lesson> GetLessonByIdAsync(ApplicationDbContext dataContext, int id)
        {
            return await dataContext.Lessons
                .Include(l => l.Language)
                .Include(l => l.GrammarPoints)
                .Include(l => l.Words)
                .ThenInclude(w => w.Translations)
                .FirstOrDefaultAsync(g => g.Id == id);
        }
        public static async Task<IEnumerable<Lesson>> GetLessonsByLanguageIdAsync(ApplicationDbContext dataContext, int id)
        {
            return await dataContext.Lessons
                .Include(l => l.Language)
                .Include(l => l.Words)
                .Include(l => l.GrammarPoints)
                .Where(l => l.Language.Id == id)
                .ToListAsync();
        }

        public static async Task<IEnumerable<Lesson>> GetLessonsByPageAsync(ApplicationDbContext dataContext, int page, int itemsPerPage)
        {
            return await dataContext.Lessons
                .Include(l => l.Words)
                .Include(l => l.GrammarPoints)
                .Include(l => l.Language)
                .Skip(page * itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(u => u.Id)
                .ToListAsync();
        }
        public static async Task<IEnumerable<Lesson>> GetLessonsByPageAsync(ApplicationDbContext dataContext, int page, int itemsPerPage, string searchQuery)
        {
            return await dataContext.Lessons
                .Include(l => l.Words)
                .Include(l => l.GrammarPoints)
                .Include(l => l.Language)
                .Where(u => u.Title.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)
                    || u.Description.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase))
                .Skip(page * itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(u => u.Id)
                .ToListAsync();
        }
        public static async Task<IEnumerable<Lesson>> GetLessonsByPageAsync(ApplicationDbContext dataContext, int userId, int page, int itemsPerPage)
        {
            var user = await dataContext.Users
                .Include(u => u.Lessons)
                .FirstOrDefaultAsync(u => u.Id == userId);
            return user.Lessons
                .Skip(page * itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(u => u.Id);
        }
        public static async Task<IEnumerable<Lesson>> GetLessonsByPageAsync(ApplicationDbContext dataContext, int userId, int page, int itemsPerPage, string searchQuery)
        {
            var user = await dataContext.Users
                .Include(u => u.Lessons)
                .FirstOrDefaultAsync(u => u.Id == userId);
            return user.Lessons
                .Where(u => u.Title.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)
                    || u.Description.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase))
                .Skip(page * itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(u => u.Id);
        }
    }
}