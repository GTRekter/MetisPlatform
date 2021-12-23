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
        #region Types
        public static async Task<IEnumerable<WordType>> GetAllWordTypes(ApplicationDbContext context)
        {
            return await context.WordTypes.ToListAsync();
        }
        #endregion
        #region Languages
        public static async Task<IEnumerable<Language>> GetAllLanguage(ApplicationDbContext context)
        {
            return await context.Languages.ToListAsync();
        }
        #endregion
    }
}