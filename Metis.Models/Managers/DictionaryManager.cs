using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Metis.Models.Store;
using Microsoft.EntityFrameworkCore;

namespace Metis.Models.Managers
{
    public static class DictionaryManager
    {
        #region Words
        public static async Task AddWord(ApplicationDbContext context, Word word)
        {
            context.Words.Add(word);
            await context.SaveChangesAsync();
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
        #region Languages
        public static async Task<Language> AddLanguage(ApplicationDbContext context, Language language)
        {
            context.Languages.Add(language);
            await context.SaveChangesAsync();
            return language;
        }
        public static async Task RemoveLanguageById(ApplicationDbContext context, int id)
        {
            var languageToRemove = await context.Languages.FindAsync(id);
            context.Languages.Remove(languageToRemove);
            await context.SaveChangesAsync();
        }
        public static async Task<IEnumerable<Language>> GetAllLanguage(ApplicationDbContext context)
        {
            return await context.Languages.ToListAsync();
        }
        #endregion
    }
}