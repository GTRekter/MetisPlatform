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
        public static async Task AddWordAsync(ApplicationDbContext dataContext, string text, string romanization, int dictionaryId, int wordTypeId, string description, string example, IEnumerable<KeyValuePair<int, string>> translations)
        {
            Word word = new Word
            {
                Text = text,
                Romanization = romanization,
                Description = description,
                Example = example,
                WordType = await dataContext.WordTypes.FindAsync(wordTypeId),
                Dictionary = await dataContext.Dictionaries.FindAsync(dictionaryId),
                Translations = translations.Select(t => new Translation
                {
                    DictionaryId = t.Key,
                    Text = t.Value
                }).ToList()
            };
            dataContext.Words.Add(word);
            await dataContext.SaveChangesAsync();
        }
        public static async Task EditWordAsync(ApplicationDbContext dataContext, int id, string text, string romanization, int dictionaryId, int wordTypeId, string description, string example, IEnumerable<KeyValuePair<int, string>> translationsToAdd, IEnumerable<KeyValuePair<int, string>> translationsToEdit)
        {
            // using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            // {
            Word wordToEdit = await dataContext.Words.Include(w => w.Translations).FirstOrDefaultAsync(w => w.Id == id);
            if (wordToEdit == null)
            {
                throw new Exception("Word not found");
            }
            wordToEdit.Text = text;
            wordToEdit.Romanization = romanization;
            wordToEdit.Description = description;
            wordToEdit.Example = example;
            wordToEdit.WordType = await dataContext.WordTypes.FindAsync(wordTypeId);
            wordToEdit.Dictionary = await dataContext.Dictionaries.FindAsync(dictionaryId);
            foreach (var item in translationsToAdd)
            {
                wordToEdit.Translations.Add(new Translation
                {
                    DictionaryId = item.Key,
                    Text = item.Value
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
            //     scope.Complete();
            // }
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
        public static async Task<int> GetWordsCountAsync(ApplicationDbContext dataContext, int id)
        {
            var lessons = await dataContext.Users
                .Include(u => u.Lessons)
                .ThenInclude(l => l.Words)
                .FirstOrDefaultAsync(u => u.Id == id);
            return lessons.Lessons
                .SelectMany(l => l.Words)
                .Count();
        }
        public static async Task<int> GetWordsCountAsync(ApplicationDbContext dataContext, string searchQuery)
        {
            return await dataContext.Words
                .Where(u => u.Text.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)
                    || u.Romanization.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)
                    || u.Description.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)
                    || u.Translations.Any(t => t.Text.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)))
                .CountAsync();
        }
        public static async Task<int> GetWordsCountAsync(ApplicationDbContext dataContext, int id, string searchQuery)
        {
            var lessons = await dataContext.Users
                .Include(u => u.Lessons)
                .ThenInclude(l => l.Words)
                .FirstOrDefaultAsync(u => u.Id == id);
            return lessons.Lessons.SelectMany(l => l.Words)
                .Where(u => u.Text.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)
                    || u.Romanization.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)
                    || u.Description.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)
                    || u.Translations.Any(t => t.Text.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)))
                .Count();
        }
        
        
        public static async Task<IEnumerable<Word>> GetWordsAsync(ApplicationDbContext dataContext)
        {
            return await dataContext.Words
                .Include(w => w.Translations)
                .ToListAsync();
        }
        public static async Task<IEnumerable<Word>> GetWordsAsync(ApplicationDbContext dataContext, int id)
        {
            var user = dataContext.Users.FirstOrDefault(u => u.Id == id);
            var lessons = await dataContext.Users
                .Include(u => u.Lessons)
                .ThenInclude(l => l.Words)
                .ThenInclude(w => w.Translations.Where(t => t.DictionaryId == user.DictionaryId))
                .FirstOrDefaultAsync(u => u.Id == id);
            return lessons.Lessons.SelectMany(l => l.Words);
        }
        public static async Task<IEnumerable<Word>> GetWordsAsync(ApplicationDbContext dataContext, int id, int wordTypeId)
        {
            var user = dataContext.Users.FirstOrDefault(u => u.Id == id);
            var lessons = await dataContext.Users
                .Include(u => u.Lessons)
                    .ThenInclude(l => l.Words)
                    .ThenInclude(w => w.WordType)
                .Include(u => u.Lessons)
                    .ThenInclude(l => l.Words)
                    .ThenInclude(w => w.Translations.Where(t => t.DictionaryId == user.DictionaryId))
                .FirstOrDefaultAsync(u => u.Id == id);
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
        public static async Task<IEnumerable<Word>> GetWordsByDictionaryId(ApplicationDbContext dataContext, int id)
        {
            return await dataContext.Words
                .Include(w => w.Translations)
                .Where(w => w.Dictionary.Id == id)
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
        public static async Task<IEnumerable<Word>> GetWordsByPageAsync(ApplicationDbContext dataContext, int id, int page, int itemsPerPage)
        {
            var user = dataContext.Users.FirstOrDefault(u => u.Id == id);
            var lessons = await dataContext.Users
                .Include(u => u.Lessons)
                .ThenInclude(l => l.Words)
                .ThenInclude(w => w.Translations.Where(t => t.DictionaryId == user.DictionaryId))
                .FirstOrDefaultAsync(u => u.Id == id);
            return lessons.Lessons.SelectMany(l => l.Words)
                .Skip(page * itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(u => u.Id);
        }
        public static async Task<IEnumerable<Word>> GetWordsByPageAsync(ApplicationDbContext dataContext, int page, int itemsPerPage, string searchQuery)
        {
            return await dataContext.Words
                .Include(w => w.Translations)
                .Where(u => u.Text.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)
                    || u.Romanization.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)
                    || u.Description.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)
                    || u.Translations.Any(t => t.Text.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)))
                .Skip(page * itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(u => u.Id).ToListAsync();
        }
        public static async Task<IEnumerable<Word>> GetWordsByPageAsync(ApplicationDbContext dataContext, int id, int page, int itemsPerPage, string searchQuery)
        {
            var user = dataContext.Users.FirstOrDefault(u => u.Id == id);
            var lessons = await dataContext.Users
                .Include(u => u.Lessons)
                .ThenInclude(l => l.Words)
                .ThenInclude(w => w.Translations.Where(t => t.DictionaryId == user.DictionaryId))
                .FirstOrDefaultAsync(u => u.Id == id);
            return lessons.Lessons.SelectMany(l => l.Words)
                .Where(u => u.Text.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)
                    || u.Romanization.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)
                    || u.Description.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)
                    || u.Translations.Any(t => t.Text.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)))
                .Skip(page * itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(u => u.Id);
        }
    }
}