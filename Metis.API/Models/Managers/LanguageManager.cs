using System;
using System.Linq;
using System.Transactions;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Metis.Models.Store;

namespace Metis.Models.Managers
{
    public static class LanguageManager
    {
        public static async Task AddLanguageAsync(ApplicationDbContext dataContext, string name, bool enabled, int languageId)
        {
            Language language = new Language()
            {
                Name = name,
                Enabled = enabled
            };
            dataContext.Languages.Add(language);
            await dataContext.SaveChangesAsync();
        }
        public static async Task EditLanguageAsync(ApplicationDbContext dataContext, int id,  string name, bool enabled, string description)
        {
            Language language = await dataContext.Languages.FindAsync(id);
            if (language == null)
            {
                throw new Exception("Language not found");
            }
            language.Name = name;
            language.Enabled = enabled; 
            dataContext.Update(language);
            await dataContext.SaveChangesAsync();
        }
        public static async Task DeleteLanguageByIdAsync(ApplicationDbContext dataContext, int id)
        {
            var languageToRemove = await dataContext.Languages.FindAsync(id);
            dataContext.Languages.Remove(languageToRemove);
            await dataContext.SaveChangesAsync();
        }  
        

        public static async Task<IEnumerable<Language>> GetLanguagesAsync(ApplicationDbContext dataContext)
        {
            return await dataContext.Languages
                .ToListAsync();
        }
        public static async Task<IEnumerable<Language>> GetLanguagesAsync(ApplicationDbContext dataContext, int page, int itemsPerPage)
        {
            return await dataContext.Languages
                .Skip(page*itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(c => c.Name)
                .ToListAsync();
        }
        public static async Task<IEnumerable<Language>> GetLanguagesAsync(ApplicationDbContext dataContext, bool enabled, int page, int itemsPerPage)
        {
            return await dataContext.Languages
                .Where(d => d.Enabled == enabled)
                .Skip(page*itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(c => c.Name)
                .ToListAsync();
        }
    }
}