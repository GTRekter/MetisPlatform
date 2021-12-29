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
    }
}