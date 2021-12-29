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
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                context.Words.Add(word);
                // await context.SaveChangesAsync();
                // foreach (var translation in word.Translations)
                // {
                //     context.Translations.Add(translation);
                // }
                await context.SaveChangesAsync();
                scope.Complete();
            }
            return word;
        }
        public static async Task<IEnumerable<Word>> GetWords(ApplicationDbContext context)
        {
            return await context.Words.Include(w => w.Translations).ToListAsync();
        }
        public static async Task<IEnumerable<Word>> GetWordsByPage(ApplicationDbContext context, int page, int itemsPerPage)
        {
            return await context.Words.Include(w => w.Translations).Skip(page * itemsPerPage).Take(itemsPerPage).ToListAsync();
        }
        public static async Task RemoveWordById(ApplicationDbContext context, int id)
        {
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
    }
}