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
        public static async Task UpdateDictionary(ApplicationDbContext context, int idDictionary, bool enable)
        {
            Dictionary dictionaryToEnable = await context.Dictionaries.FirstOrDefaultAsync(d => d.Id == idDictionary);
            dictionaryToEnable.Enabled = enable;
            await context.SaveChangesAsync();
        }
        public static async Task UpdateDictionary(ApplicationDbContext context, int idDictionary, bool enable, bool primary)
        {
            if(primary) 
            {
                Dictionary previousPrimaryDictionary = await context.Dictionaries.FirstOrDefaultAsync(d => d.Primary);
                if(previousPrimaryDictionary != null) 
                {
                    previousPrimaryDictionary.Primary = false;
                }
            }
            Dictionary dictionaryToEnable = await context.Dictionaries.FirstOrDefaultAsync(d => d.Id == idDictionary);
            dictionaryToEnable.Enabled = enable;
            dictionaryToEnable.Primary = primary;
            await context.SaveChangesAsync();
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
        public static async Task<IEnumerable<Dictionary>> GetDictionary(ApplicationDbContext context, bool enabled)
        {
            return await context.Dictionaries.Where(d => d.Enabled == enabled).ToListAsync();
        }
        public static async Task<IEnumerable<Dictionary>> GetDictionary(ApplicationDbContext context, bool enabled, int page, int itemsPerPage)
        {
            return await context.Dictionaries.Where(d => d.Enabled == enabled).Skip(page*itemsPerPage).Take(itemsPerPage).OrderBy(c => c.Name).ToListAsync();
        }
        public static async Task<int> GetDictionariesCount(ApplicationDbContext context, bool enabled)
        {
            return await context.Dictionaries.Where(d => d.Enabled == enabled).CountAsync();
        }
    }
}