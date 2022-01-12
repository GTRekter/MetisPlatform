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
        public static async Task AddWord(ApplicationDbContext context, string text, string romanization, int dictionaryId, int wordTypeId, string description, string example, IEnumerable<KeyValuePair<int, string>> translations)
        {
            // using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            // {
            Word word = new Word
            {
                Text = text,
                Romanization = romanization,
                Description = description,
                Example = example,
                WordType = await context.WordTypes.FindAsync(wordTypeId),
                Dictionary = await context.Dictionaries.FindAsync(dictionaryId),
                Translations = translations.Select(t => new Translation
                {
                    DictionaryId = t.Key,
                    Text = t.Value
                }).ToList()
            };
            context.Words.Add(word);
            await context.SaveChangesAsync();
            //     scope.Complete();
            // }
        }
        public static async Task EditWord(ApplicationDbContext context, int id, string text, string romanization, int dictionaryId, int wordTypeId, string description, string example, IEnumerable<KeyValuePair<int, string>> translationsToAdd, IEnumerable<KeyValuePair<int, string>> translationsToEdit)
        {
            // using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            // {
            Word wordToEdit = await context.Words.Include(w => w.Translations).FirstOrDefaultAsync(w => w.Id == id);
            if (wordToEdit == null)
            {
                throw new Exception("Word not found");
            }
            wordToEdit.Text = text;
            wordToEdit.Romanization = romanization;
            wordToEdit.Description = description;
            wordToEdit.Example = example;
            wordToEdit.WordType = await context.WordTypes.FindAsync(wordTypeId);
            wordToEdit.Dictionary = await context.Dictionaries.FindAsync(dictionaryId);
            foreach (var item in translationsToAdd)
            {
                wordToEdit.Translations.Add(new Translation
                {
                    DictionaryId = item.Key,
                    Text = item.Value
                });
            }
            context.Update(wordToEdit);
            foreach (var translation in translationsToEdit)
            {
                Translation translationToEdit = await context.Translations.FindAsync(translation.Key);
                if (translationToEdit == null)
                {
                    throw new Exception("Translation not found");
                }
                translationToEdit.Text = translation.Value;
                context.Update(translationToEdit);
            }
            await context.SaveChangesAsync();
            //     scope.Complete();
            // }
        }
        public static async Task DeleteWordById(ApplicationDbContext context, int id)
        {
            // var lessonToRemove = await context.Words.FindAsync(id);
            // context.Words.Remove(lessonToRemove);
            // await context.SaveChangesAsync();
            // using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            // {
                var wordToRemove = await context.Words.Include(w => w.Translations).FirstOrDefaultAsync(w => w.Id == id);
                context.Words.Remove(wordToRemove);
                // foreach (var translation in wordToRemove.Translations)
                // {
                //     context.Translations.Remove(translation);
                // }
                await context.SaveChangesAsync();
            //     scope.Complete();
            // }
        }
        public static async Task<Word> GetWordById(ApplicationDbContext context, int id)
        {
            return await context.Words
                .Include(w => w.Translations)
                .FirstOrDefaultAsync(w => w.Id == id);
        }
        public static async Task<IEnumerable<Word>> GetWordsByDictionaryId(ApplicationDbContext context, int id)
        {
            return await context.Words
                .Include(w => w.Translations)
                .Where(w => w.Dictionary.Id == id)
                .ToListAsync();
        }
        public static async Task<int> GetWordsCount(ApplicationDbContext context)
        {
            return await context.Words.CountAsync();
        }
        public static async Task<int> GetWordsByUserIdCount(ApplicationDbContext context, int id)
        {
            var lessons = await context.Users
                .Include(u => u.Lessons)
                .ThenInclude(l => l.Words)
                .FirstOrDefaultAsync(u => u.Id == id);
            return lessons.Lessons.SelectMany(l => l.Words).Count();
        }
        public static async Task<int> GetWordsBySearchQueryCount(ApplicationDbContext context, string searchQuery)
        {
            return await context.Words
                .Where(u => u.Text.Contains(searchQuery)
                    || u.Romanization.Contains(searchQuery)
                    || u.Description.Contains(searchQuery))
                .CountAsync();
        }
        public static async Task<int> GetWordsByUserIdAndSearchQueryCount(ApplicationDbContext context, int id, string searchQuery)
        {
            var lessons = await context.Users
                .Include(u => u.Lessons)
                .ThenInclude(l => l.Words)
                .FirstOrDefaultAsync(u => u.Id == id);
            return lessons.Lessons.SelectMany(l => l.Words)
                .Where(u => u.Text.Contains(searchQuery)
                    || u.Romanization.Contains(searchQuery)
                    || u.Description.Contains(searchQuery))
                .Count();
        }
        public static async Task<IEnumerable<Word>> GetWords(ApplicationDbContext context)
        {
            return await context.Words
                .Include(w => w.Translations)
                .ToListAsync();
        }
        public static async Task<IEnumerable<Word>> GetWordsByUserId(ApplicationDbContext context, int id)
        {
                        var user = context.Users.FirstOrDefault(u => u.Id == id);
            var lessons = await context.Users
                .Include(u => u.Lessons)
                .ThenInclude(l => l.Words)
                .ThenInclude(w => w.Translations.Where(t => t.DictionaryId == user.DictionaryId))
                .FirstOrDefaultAsync(u => u.Id == id);
            return lessons.Lessons.SelectMany(l => l.Words);
        }
        public static async Task<IEnumerable<Word>> GetWordsByUserIdAndWordTypeId(ApplicationDbContext context, int id, int wordTypeId)
        {
            var user = context.Users.FirstOrDefault(u => u.Id == id);
            var lessons = await context.Users
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
        public static async Task<IEnumerable<Word>> GetWordsByPage(ApplicationDbContext context, int page, int itemsPerPage)
        {
            return await context.Words
                .Include(w => w.Translations)
                .Skip(page * itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(u => u.Id)
                .ToListAsync();
        }
        public static async Task<IEnumerable<Word>> GetWordsByUserIdAndPage(ApplicationDbContext context, int id, int page, int itemsPerPage)
        {
            var user = context.Users.FirstOrDefault(u => u.Id == id);
            var lessons = await context.Users
                .Include(u => u.Lessons)
                .ThenInclude(l => l.Words)
                .ThenInclude(w => w.Translations.Where(t => t.DictionaryId == user.DictionaryId))
                .FirstOrDefaultAsync(u => u.Id == id);
            return lessons.Lessons.SelectMany(l => l.Words)
                .Skip(page * itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(u => u.Id);
        }
        public static async Task<IEnumerable<Word>> GetWordsByPageAndSearchQuery(ApplicationDbContext context, int page, int itemsPerPage, string searchQuery)
        {
            return await context.Words
                .Include(w => w.Translations)
                .Where(u => u.Text.Contains(searchQuery)
                    || u.Romanization.Contains(searchQuery)
                    || u.Description.Contains(searchQuery))
                .Skip(page * itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(u => u.Id).ToListAsync();
        }
        public static async Task<IEnumerable<Word>> GetWordsByUserIdAndPageAndSearchQuery(ApplicationDbContext context, int id, int page, int itemsPerPage, string searchQuery)
        {
            var user = context.Users.FirstOrDefault(u => u.Id == id);
            var lessons = await context.Users
                .Include(u => u.Lessons)
                .ThenInclude(l => l.Words)
                .ThenInclude(w => w.Translations.Where(t => t.DictionaryId == user.DictionaryId))
                .FirstOrDefaultAsync(u => u.Id == id);
            return lessons.Lessons.SelectMany(l => l.Words)
                .Where(u => u.Text.Contains(searchQuery)
                    || u.Romanization.Contains(searchQuery)
                    || u.Description.Contains(searchQuery))
                .Skip(page * itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(u => u.Id);
        }
    }
}