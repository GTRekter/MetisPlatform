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
        public static async Task<IEnumerable<Dictionary>> GetDictionaries(ApplicationDbContext context)
        {
            return await context.Dictionaries.ToListAsync();
        }
        public static async Task<IEnumerable<Dictionary>> GetDictionaries(ApplicationDbContext context, int page, int itemsPerPage)
        {
            return await context.Dictionaries.Skip(page*itemsPerPage).Take(itemsPerPage).OrderBy(c => c.Name).ToListAsync();
        }
        public static async Task<IEnumerable<Dictionary>> GetDictionaries(ApplicationDbContext context, bool enabled, int page, int itemsPerPage)
        {
            return await context.Dictionaries.Where(d => d.Enabled == enabled).Skip(page*itemsPerPage).Take(itemsPerPage).OrderBy(c => c.Name).ToListAsync();
        }
    }
}