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
        public static async Task<Word> AddWord(ApplicationDbContext context, Word word)
        {
            context.Words.Add(word);
            await context.SaveChangesAsync();
            return word;
        }
        public static async Task<Word> AddWordWithTranslations(ApplicationDbContext context, Word word, IEnumerable<Translation> translations)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                context.Words.Add(word);
                await context.SaveChangesAsync();
                foreach (var translation in translations)
                {
                    translation.WordId = word.Id;
                    context.Translations.Add(translation);
                }
                await context.SaveChangesAsync();
                scope.Complete();
            }
            return word;
        }
        public static async Task<Word> GetWordById(ApplicationDbContext context, int id)
        {
            return await context.Words.FindAsync(id);
        }
        
        public static async Task<IEnumerable<Word>> GetWordsByWordTypeId(ApplicationDbContext context, int id)
        {
            return await context.Words.Include(w => w.Translations).Where(w => w.WordTypeId == id).ToListAsync();
        }
        public static async Task<IEnumerable<Word>> GetWords(ApplicationDbContext context)
        {
            return await context.Words.ToListAsync();
        }
        public static async Task<int> GetWordsCount(ApplicationDbContext context)
        {
            return await context.Words.CountAsync();
        }
        public static async Task<IEnumerable<Word>> GetWordsWithTranslationsByPage(ApplicationDbContext context, int page, int itemsPerPage)
        {
            return await context.Words.Include(w => w.Translations).Skip(page * itemsPerPage).Take(itemsPerPage).ToListAsync();
        }
        public static async Task RemoveWordById(ApplicationDbContext context, int id)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var wordToRemove = await context.Words.FindAsync(id);
                context.Words.Remove(wordToRemove);
                var tranlationsToRemove = await context.Translations.Where(t => t.WordId == id).ToListAsync();
                foreach (var translation in tranlationsToRemove)
                {
                    context.Translations.Remove(translation);
                }
                await context.SaveChangesAsync();
                scope.Complete();
            }          
        }    
    }
}