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