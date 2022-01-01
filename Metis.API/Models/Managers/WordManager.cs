using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Metis.Models.Store;
using Microsoft.EntityFrameworkCore;
using System.Transactions;

namespace Metis.Models.Managers
{
    public static class WordManager
    {
        public static async Task AddWord(ApplicationDbContext context, string text, string romanization, string description, string example)
        {
            Word word = new Word { Text = text, Romanization = romanization, Description = description, Example = example };
            // using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            // {
                context.Words.Add(word);
                // await context.SaveChangesAsync();
                // foreach (var translation in word.Translations)
                // {
                //     context.Translations.Add(translation);
                // }
                await context.SaveChangesAsync();
            //     scope.Complete();
            // }
        }
        public static async Task<Word> GetWordById(ApplicationDbContext context, int id)
        {
            return await context.Words.FindAsync(id);
        }
        public static async Task<int> GetWordsCount(ApplicationDbContext context)
        {
            return await context.Words.CountAsync();
        }
        public static async Task<int> GetWordsBySearchQueryCount(ApplicationDbContext context, string searchQuery)
        {
            return await context.Words.Where(u => u.Description.Contains(searchQuery)).CountAsync();
        }
        public static async Task<IEnumerable<Word>> GetWords(ApplicationDbContext context)
        {
            return await context.Words.Include(w => w.Translations).ToListAsync();
        }
        public static async Task EditWord(ApplicationDbContext context, int id, string text, string romanization, string description, string example)
        {
            Word word = await context.Words.FindAsync(id);
            if (word == null)
            {
                throw new Exception("Word not found");
            }
            word.Text = text;
            word.Romanization = romanization;
            word.Description = description;
            word.Example = example;
            context.Update(word);
            await context.SaveChangesAsync();
        }
        public static async Task DeleteWordById(ApplicationDbContext context, int id)
        {
            // var lessonToRemove = await context.Words.FindAsync(id);
            // context.Words.Remove(lessonToRemove);
            // await context.SaveChangesAsync();
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var wordToRemove = await context.Words.Include(w => w.Translations).FirstOrDefaultAsync(w => w.Id == id);
                context.Words.Remove(wordToRemove);
                foreach (var translation in wordToRemove.Translations)
                {
                    context.Translations.Remove(translation);
                }
                await context.SaveChangesAsync();
                scope.Complete();
            }
        }
        public static async Task<IEnumerable<Word>> GetWordsByPage(ApplicationDbContext context, int page, int itemsPerPage)
        {
            return await context.Words.Include(w => w.Translations).Skip(page * itemsPerPage).Take(itemsPerPage).OrderBy(u => u.Id).ToListAsync();
        }
        public static async Task<IEnumerable<Word>> GetWordsByPageAndSearchQuery(ApplicationDbContext context, int page, int itemsPerPage, string searchQuery)
        {
            return await context.Words.Include(w => w.Translations).Where(u => u.Description.Contains(searchQuery)).Skip(page * itemsPerPage).Take(itemsPerPage).OrderBy(u => u.Id).ToListAsync();
        }
    }
}