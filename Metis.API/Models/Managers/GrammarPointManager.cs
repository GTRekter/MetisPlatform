using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Metis.Models.Store;
using Microsoft.EntityFrameworkCore;

namespace Metis.Models.Managers
{
    public static class GrammarPointManager
    {
        public static async Task<GrammarPoint> AddGrammarPoint(ApplicationDbContext context, GrammarPoint grammarPoint)
        {
            context.GrammarPoints.Add(grammarPoint);
            await context.SaveChangesAsync();
            return grammarPoint;
        }
        public static async Task<GrammarPoint> GetGrammarPointById(ApplicationDbContext context, int id)
        {
            return await context.GrammarPoints.FindAsync(id);
        }
        public static async Task<IEnumerable<GrammarPoint>> GetGrammarPoints(ApplicationDbContext context)
        {
            return await context.GrammarPoints.ToListAsync();
        }
        public static async Task RemoveGrammarPointById(ApplicationDbContext context, int id)
        {
            var grammarPointToRemove = await context.GrammarPoints.FindAsync(id);
            context.GrammarPoints.Remove(grammarPointToRemove);
            await context.SaveChangesAsync();
        }
    }
}