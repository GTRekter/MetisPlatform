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
        public static async Task<Word> AddWord(ApplicationDbContext context, Word word, IEnumerable<Translation> translations)
        {
            using (TransactionScope scope = new TransactionScope())
            {
                context.Words.Add(word);
                await context.SaveChangesAsync();
                foreach (var translation in translations)
                {
                    translation.IdWord = word.Id;
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
        public static async Task<IEnumerable<Word>> GetAllWord(ApplicationDbContext context)
        {
            return await context.Words.ToListAsync();
        }
        public static async Task RemoveWordById(ApplicationDbContext context, int id)
        {
            var wordToRemove = await context.Words.FindAsync(id);
            context.Words.Remove(wordToRemove);
            await context.SaveChangesAsync();
        }    
    }
}