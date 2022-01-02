using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Metis.Models.Store;
using Microsoft.EntityFrameworkCore;

namespace Metis.Models.Managers
{
    public static class GrammarPointManager
    {
        public static async Task AddGrammarPoint(ApplicationDbContext context, string title, string description)
        {
            GrammarPoint grammarPoint = new GrammarPoint { Title = title, Description = description };
            context.GrammarPoints.Add(grammarPoint);
            await context.SaveChangesAsync();
        }
        public static async Task<GrammarPoint> GetGrammarPointById(ApplicationDbContext context, int id)
        {
            return await context.GrammarPoints.FindAsync(id);
        }
        public static async Task<int> GetGrammarPointsCount(ApplicationDbContext context)
        {
            return await context.GrammarPoints.CountAsync();
        }
        public static async Task<int> GetGrammarPointsBySearchQueryCount(ApplicationDbContext context, string searchQuery)
        {
            return await context.GrammarPoints.Where(gp => gp.Title.Contains(searchQuery) || gp.Description.Contains(searchQuery)).OrderBy(gp => gp.Title).CountAsync();
        }
        public static async Task<IEnumerable<GrammarPoint>> GetGrammarPoints(ApplicationDbContext context)
        {
            return await context.GrammarPoints.ToListAsync();
        }
        public static async Task EditGrammarPoint(ApplicationDbContext context, int id,  string title, string description)
        {
            GrammarPoint grammarPoint = await context.GrammarPoints.FindAsync(id);
            if (grammarPoint == null)
            {
                throw new Exception("User not found");
            }
            grammarPoint.Title = description;
            grammarPoint.Description = description; 
            context.Update(grammarPoint);
            await context.SaveChangesAsync();
        }
        public static async Task DeleteGrammarPointById(ApplicationDbContext context, int id)
        {
            var grammarPointToRemove = await context.GrammarPoints.FindAsync(id);
            context.GrammarPoints.Remove(grammarPointToRemove);
            await context.SaveChangesAsync();
        }  
        public static async Task<IEnumerable<GrammarPoint>> GetGrammarPointsByPage(ApplicationDbContext context, int page, int itemsPerPage)
        {
            return await context.GrammarPoints.Skip(page * itemsPerPage).Take(itemsPerPage).OrderBy(gp => gp.Title).ToListAsync();
        }
        public static async Task<IEnumerable<GrammarPoint>> GetGrammarPointsByPageAndSearchQuery(ApplicationDbContext context, int page, int itemsPerPage, string searchQuery)
        {
            return await context.GrammarPoints.Where(gp => gp.Title.Contains(searchQuery) || gp.Description.Contains(searchQuery)).Skip(page * itemsPerPage).Take(itemsPerPage).OrderBy(gp => gp.Title).ToListAsync();
        }
    }
}