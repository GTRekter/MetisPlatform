using System;
using System.Linq;
using System.Transactions;
using System.Threading.Tasks;
using System.Collections.Generic;
using Metis.Models.Store;
using Microsoft.EntityFrameworkCore;

namespace Metis.Models.Managers
{
    public static class WordManager
    {
        public static async Task AddWordAsync(ApplicationDbContext dataContext, string text, string romanization, int languageId, int wordTypeId, string description, string example, IEnumerable<KeyValuePair<int, string>> translations)
        {
            Word word = new Word
            {
                Text = text.ToLower(),
                Romanization = romanization.ToLower(),
                Description = description,
                Example = example,
                WordType = await dataContext.WordTypes.FindAsync(wordTypeId),
                Language = await dataContext.Languages.FindAsync(languageId),
                Translations = translations.Select(t => new Translation
                {
                    LanguageId = t.Key,
                    Text = t.Value.ToLower()
                }).ToList()
            };
            dataContext.Words.Add(word);
            await dataContext.SaveChangesAsync();
        }
        public static async Task EditWordAsync(ApplicationDbContext dataContext, int id, string text, string romanization, int languageId, int wordTypeId, string description, string example, IEnumerable<KeyValuePair<int, string>> translationsToAdd, IEnumerable<KeyValuePair<int, string>> translationsToEdit)
        {
            Word wordToEdit = await dataContext.Words.Include(w => w.Translations).FirstOrDefaultAsync(w => w.Id == id);
            if (wordToEdit == null)
            {
                throw new Exception("Word not found");
            }
            wordToEdit.Text = text.ToLower();
            wordToEdit.Romanization = romanization.ToLower();
            wordToEdit.Description = description;
            wordToEdit.Example = example;
            wordToEdit.WordType = await dataContext.WordTypes.FindAsync(wordTypeId);
            wordToEdit.Language = await dataContext.Languages.FindAsync(languageId);
            foreach (var item in translationsToAdd)
            {
                wordToEdit.Translations.Add(new Translation
                {
                    LanguageId = item.Key,
                    Text = item.Value.ToLower()
                });
            }
            dataContext.Update(wordToEdit);
            foreach (var translation in translationsToEdit)
            {
                Translation translationToEdit = await dataContext.Translations.FindAsync(translation.Key);
                if (translationToEdit == null)
                {
                    throw new Exception("Translation not found");
                }
                translationToEdit.Text = translation.Value;
                dataContext.Update(translationToEdit);
            }
            await dataContext.SaveChangesAsync();
        }
        public static async Task DeleteWordByIdAsync(ApplicationDbContext dataContext, int id)
        {
            var wordToRemove = await dataContext.Words.Include(w => w.Translations).FirstOrDefaultAsync(w => w.Id == id);
            dataContext.Words.Remove(wordToRemove);
            await dataContext.SaveChangesAsync();
        }
        

        public static async Task<int> GetWordsCountAsync(ApplicationDbContext dataContext)
        {
            return await dataContext.Words
            .CountAsync();
        }
        public static async Task<int> GetWordsCountAsync(ApplicationDbContext dataContext, int userId)
        {
            var lessons = await dataContext.Users
                .Include(u => u.Lessons)
                .ThenInclude(l => l.Words)
                .FirstOrDefaultAsync(u => u.Id == userId);
            return lessons.Lessons
                .SelectMany(l => l.Words)
                .Count();
        }
        public static async Task<int> GetWordsCountAsync(ApplicationDbContext dataContext, string searchQuery)
        {
            return await dataContext.Words
                .Where(u => u.Text.Contains(searchQuery)
                    || u.Romanization.Contains(searchQuery)
                    || u.Description.Contains(searchQuery)
                    || u.Translations.Any(t => t.Text.Contains(searchQuery)))
                .CountAsync();
        }
        public static async Task<int> GetWordsCountAsync(ApplicationDbContext dataContext, int id, string searchQuery)
        {
            var lessons = await dataContext.Users
                .Include(u => u.Lessons)
                .ThenInclude(l => l.Words)
                .FirstOrDefaultAsync(u => u.Id == id);
            return lessons.Lessons.SelectMany(l => l.Words)
                .Where(u => u.Text.Contains(searchQuery)
                    || u.Romanization.Contains(searchQuery)
                    || u.Description.Contains(searchQuery)
                    || u.Translations.Any(t => t.Text.Contains(searchQuery)))
                .Count();
        }
          
        public static async Task<IEnumerable<Word>> GetWordsAsync(ApplicationDbContext dataContext)
        {
            return await dataContext.Words
                .Include(w => w.Translations)
                .ToListAsync();
        }
        public static async Task<IEnumerable<Word>> GetWordsAsync(ApplicationDbContext dataContext, int userId)
        {
            var user = dataContext.Users.FirstOrDefault(u => u.Id == userId);
            var lessons = await dataContext.Users
                .Include(u => u.Lessons)
                .ThenInclude(l => l.Words)
                .ThenInclude(w => w.Translations.Where(t => t.LanguageId == user.LanguageId))
                .FirstOrDefaultAsync(u => u.Id == userId);
            return lessons.Lessons.SelectMany(l => l.Words);
        }
        public static async Task<IEnumerable<Word>> GetWordsAsync(ApplicationDbContext dataContext, int userId, int wordTypeId)
        {
            var user = dataContext.Users.FirstOrDefault(u => u.Id == userId);
            var lessons = await dataContext.Users
                .Include(u => u.Lessons)
                    .ThenInclude(l => l.Words)
                    .ThenInclude(w => w.WordType)
                .Include(u => u.Lessons)
                    .ThenInclude(l => l.Words)
                    .ThenInclude(w => w.Translations.Where(t => t.LanguageId == user.LanguageId))
                .FirstOrDefaultAsync(u => u.Id == userId);
            return lessons.Lessons
                    .SelectMany(l => l.Words)
                    .Where(w => w.WordType.Id == wordTypeId);
        }
        public static async Task<Word> GetWordByIdAsync(ApplicationDbContext dataContext, int id)
        {
            return await dataContext.Words
                .Include(w => w.Translations)
                .FirstOrDefaultAsync(w => w.Id == id);
        }
        public static async Task<Word> GetWordByTextAsync(ApplicationDbContext dataContext, string text)
        {
            return await dataContext.Words
                .Include(w => w.Translations)
                .FirstOrDefaultAsync(w => w.Text == text);
        }
        public static async Task<IEnumerable<Word>> GetWordsByLanguageId(ApplicationDbContext dataContext, int id)
        {
            return await dataContext.Words
                .Include(w => w.Translations)
                .Where(w => w.Language.Id == id)
                .ToListAsync();
        }

        public static async Task<IEnumerable<Word>> GetWordsByPageAsync(ApplicationDbContext dataContext, int page, int itemsPerPage)
        {
            return await dataContext.Words
                .Include(w => w.Translations)
                .Skip(page * itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(u => u.Id)
                .ToListAsync();
        }
        public static async Task<IEnumerable<Word>> GetWordsByPageAsync(ApplicationDbContext dataContext, int userId, int page, int itemsPerPage)
        {
            var user = dataContext.Users.FirstOrDefault(u => u.Id == userId);
            var lessons = await dataContext.Users
                .Include(u => u.Lessons)
                .ThenInclude(l => l.Words)
                .ThenInclude(w => w.Translations.Where(t => t.LanguageId == user.LanguageId))
                .FirstOrDefaultAsync(u => u.Id == userId);
            return lessons.Lessons.SelectMany(l => l.Words)
                .Skip(page * itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(u => u.Id);
        }
        public static async Task<IEnumerable<Word>> GetWordsByPageAsync(ApplicationDbContext dataContext, int page, int itemsPerPage, string searchQuery)
        {
            return await dataContext.Words
                .Include(w => w.Translations)
                .Where(u => u.Text.Contains(searchQuery)
                    || u.Romanization.Contains(searchQuery)
                    || u.Description.Contains(searchQuery)
                    || u.Translations.Any(t => t.Text.Contains(searchQuery)))
                .Skip(page * itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(u => u.Id).ToListAsync();
        }
        public static async Task<IEnumerable<Word>> GetWordsByPageAsync(ApplicationDbContext dataContext, int userId, int page, int itemsPerPage, string searchQuery)
        {
            var user = dataContext.Users.FirstOrDefault(u => u.Id == userId);
            var lessons = await dataContext.Users
                .Include(u => u.Lessons)
                .ThenInclude(l => l.Words)
                .ThenInclude(w => w.Translations.Where(t => t.LanguageId == user.LanguageId))
                .FirstOrDefaultAsync(u => u.Id == userId);
            return lessons.Lessons.SelectMany(l => l.Words)
                .Where(u => u.Text.Contains(searchQuery)
                    || u.Romanization.Contains(searchQuery)
                    || u.Description.Contains(searchQuery)
                    || u.Translations.Any(t => t.Text.Contains(searchQuery)))
                .Skip(page * itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(u => u.Id);
        }
    }
}