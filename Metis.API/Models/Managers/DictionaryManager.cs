using System;
using System.Linq;
using System.Transactions;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Metis.Models.Store;

namespace Metis.Models.Managers
{
    public static class DictionaryManager
    {
        public static async Task AddDictionaryAsync(ApplicationDbContext dataContext, string name, bool enabled, int dictionaryId)
        {
            Dictionary dictionary = new Dictionary()
            {
                Name = name,
                Enabled = enabled
            };
            dataContext.Dictionaries.Add(dictionary);
            await dataContext.SaveChangesAsync();
        }
        public static async Task EditDictionaryAsync(ApplicationDbContext dataContext, int id,  string name, bool enabled, string description)
        {
            Dictionary dictionary = await dataContext.Dictionaries.FindAsync(id);
            if (dictionary == null)
            {
                throw new Exception("Dictionary not found");
            }
            dictionary.Name = name;
            dictionary.Enabled = enabled; 
            dataContext.Update(dictionary);
            await dataContext.SaveChangesAsync();
        }
        public static async Task DeleteDictionaryByIdAsync(ApplicationDbContext dataContext, int id)
        {
            var dictionaryToRemove = await dataContext.Dictionaries.FindAsync(id);
            dataContext.Dictionaries.Remove(dictionaryToRemove);
            await dataContext.SaveChangesAsync();
        }  
        

        public static async Task<IEnumerable<Dictionary>> GetDictionariesAsync(ApplicationDbContext dataContext)
        {
            return await dataContext.Dictionaries
                .ToListAsync();
        }
        public static async Task<IEnumerable<Dictionary>> GetDictionariesAsync(ApplicationDbContext dataContext, int page, int itemsPerPage)
        {
            return await dataContext.Dictionaries
                .Skip(page*itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(c => c.Name)
                .ToListAsync();
        }
        public static async Task<IEnumerable<Dictionary>> GetDictionariesAsync(ApplicationDbContext dataContext, bool enabled, int page, int itemsPerPage)
        {
            return await dataContext.Dictionaries
                .Where(d => d.Enabled == enabled)
                .Skip(page*itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(c => c.Name)
                .ToListAsync();
        }
    }
}