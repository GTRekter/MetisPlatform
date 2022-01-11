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
        public static async Task AddLesson(ApplicationDbContext context, string title,  int dictionaryId, string description, IEnumerable<int> words, IEnumerable<int> grammarPoints)
        {
            // using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            // {
                var wordsToAdd = await context.Words.Where(g => words.Contains(g.Id)).ToListAsync();
                var grammarPointsToAdd = await context.GrammarPoints.Where(g => grammarPoints.Contains(g.Id)).ToListAsync();
                Lesson lesson = new Lesson 
                { 
                    Title = title, 
                    Description = description,
                    Dictionary = await context.Dictionaries.FindAsync(dictionaryId),
                    GrammarPoints = grammarPointsToAdd,
                    Words = wordsToAdd
                };
                context.Lessons.Add(lesson);
                await context.SaveChangesAsync();
                // scope.Complete();
            // }
        }     
        public static async Task<IEnumerable<Lesson>> GetLessonsByDictionaryId(ApplicationDbContext context, int id)
        {
            return await context.Lessons
                .Include(l => l.Dictionary)
                .Include(l => l.Words)
                .Include(l => l.GrammarPoints)
                .Where(l => l.Dictionary.Id == id)
                .ToListAsync();
        }
        public static async Task<Lesson> GetLessonById(ApplicationDbContext context, int id)
        {
            return await context.Lessons
                .Include(l => l.Dictionary)
                .Include(l => l.GrammarPoints)
                .Include(l => l.Words)
                .ThenInclude(w => w.Translations)
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
            return await context.Lessons
                .Include(l => l.Dictionary)
                .ToListAsync();
        }
        public static async Task EditLesson(ApplicationDbContext context, int id,  string title,  int dictionaryId, string description, IEnumerable<int> words, IEnumerable<int> grammarPoints)
        {
            Lesson lesson = await context.Lessons
                .Include(l => l.Words)
                .Include(l => l.GrammarPoints)
                .FirstOrDefaultAsync(l => l.Id == id);
            if (lesson == null)
            {
                throw new Exception("User not found");
            }
            foreach (var word in lesson.Words)
            {
                if(!words.Contains(word.Id))
                {
                    lesson.Words.Remove(word);
                }
            }
            foreach (var word in words)
            {
                if(!lesson.Words.Any(w => w.Id == word))
                {
                    var wordToAdd = await context.Words.FirstOrDefaultAsync(w => w.Id == word);
                    lesson.Words.Add(wordToAdd);
                }
            }
            foreach (var grammarPoint in lesson.GrammarPoints)
            {
                if(!grammarPoints.Contains(grammarPoint.Id))
                {
                    lesson.GrammarPoints.Remove(grammarPoint);
                }
            }
            foreach (var grammarPoint in grammarPoints)
            {
                if(!lesson.GrammarPoints.Any(w => w.Id == grammarPoint))
                {
                    var grammarPointToAdd = await context.GrammarPoints.FirstOrDefaultAsync(w => w.Id == grammarPoint);
                    lesson.GrammarPoints.Add(grammarPointToAdd);
                }
            }
            lesson.Title = title; 
            lesson.Description = description;
            lesson.Dictionary = await context.Dictionaries.FindAsync(dictionaryId);
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
            return await context.Lessons
                .Include(l => l.Words)
                .Include(l => l.GrammarPoints)
                .Include(l => l.Dictionary)
                .Skip(page * itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(u => u.Id)
                .ToListAsync();
        }
        public static async Task<IEnumerable<Lesson>> GetLessonsByPageAndSearchQuery(ApplicationDbContext context, int page, int itemsPerPage, string searchQuery)
        {
            return await context.Lessons
                .Include(l => l.Words)
                .Include(l => l.GrammarPoints)
                .Include(l => l.Dictionary)
                .Where(u => u.Title.Contains(searchQuery) 
                    || u.Description.Contains(searchQuery))
                .Skip(page * itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(u => u.Id)
                .ToListAsync();
        }
    }
}