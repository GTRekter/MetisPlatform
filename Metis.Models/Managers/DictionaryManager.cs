using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Metis.Models.Store;
using Microsoft.EntityFrameworkCore;
using System.Transactions;

namespace Metis.Models.Managers
{
    public static class DictionaryManager
    {
        #region Words
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
        #endregion
        #region WordTypes
        public static async Task<WordType> AddWordType(ApplicationDbContext context, WordType wordType)
        {
            context.WordTypes.Add(wordType);
            await context.SaveChangesAsync();
            return wordType;
        }
        public static async Task RemoveWordTypeById(ApplicationDbContext context, int id)
        {
            var wordTypeToRemove = await context.WordTypes.FindAsync(id);
            context.WordTypes.Remove(wordTypeToRemove);
            await context.SaveChangesAsync();
        }
        public static async Task<IEnumerable<WordType>> GetAllWordTypes(ApplicationDbContext context)
        {
            return await context.WordTypes.ToListAsync();
        }
        #endregion
        #region Dictionaries
        public static async Task<Dictionary> AddDictionary(ApplicationDbContext context, Dictionary dictionary)
        {
            if(dictionary.Primary) 
            {
                Dictionary previousPrimaryDictionary = await context.Dictionaries.FirstOrDefaultAsync(d => d.Primary);
                if(previousPrimaryDictionary != null) 
                {
                    previousPrimaryDictionary.Primary = false;
                }
            }
            context.Dictionaries.Add(dictionary);
            await context.SaveChangesAsync();
            return dictionary;
        }
        public static async Task RemoveDictionaryById(ApplicationDbContext context, int id)
        {
            var dictionaryToRemove = await context.Dictionaries.FindAsync(id);
            if (dictionaryToRemove.Primary)
            {
                throw new InvalidOperationException("You cannot delete a primary dictionary");
            }
            context.Dictionaries.Remove(dictionaryToRemove);
            await context.SaveChangesAsync();
        }
        public static async Task<IEnumerable<Dictionary>> GetAllDictionary(ApplicationDbContext context)
        {
            return await context.Dictionaries.ToListAsync();
        }
        public static async Task<IEnumerable<Dictionary>> GetAllDictionary(ApplicationDbContext context, int page, int itemsPerPage)
        {
            return await context.Dictionaries.Skip(page*itemsPerPage).Take(itemsPerPage).OrderBy(c => c.Name).ToListAsync();
        }
        public static async Task<int> GetDictionariesCount(ApplicationDbContext context)
        {
            return await context.Dictionaries.CountAsync();
        }
        #endregion
    }
}