using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Metis.Models.Store;
using Microsoft.EntityFrameworkCore;
using System.Transactions;

namespace Metis.Models.Managers
{
    public static class WordTypeManager
    {
        public static async Task<WordType> AddWordTypeAsync(ApplicationDbContext dataContext, WordType wordType)
        {
            dataContext.WordTypes.Add(wordType);
            await dataContext.SaveChangesAsync();
            return wordType;
        }
        public static async Task RemoveWordTypeByIdAsync(ApplicationDbContext dataContext, int id)
        {
            var wordTypeToRemove = await dataContext.WordTypes.FindAsync(id);
            dataContext.WordTypes.Remove(wordTypeToRemove);
            await dataContext.SaveChangesAsync();
        }

        public static async Task<IEnumerable<WordType>> GetWordTypesAsync(ApplicationDbContext dataContext)
        {
            return await dataContext.WordTypes
                .ToListAsync();
        }
    }
}