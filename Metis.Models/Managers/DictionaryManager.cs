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
    }
}