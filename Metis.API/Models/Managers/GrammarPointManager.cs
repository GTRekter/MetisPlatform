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
        public static async Task AddGrammarPointAsync(ApplicationDbContext dataContext, string title, string description, int dictionaryId)
        {
            GrammarPoint grammarPoint = new GrammarPoint()
            {
                Title = title,
                Description = description,
                DictionaryId = dictionaryId
            };
            dataContext.GrammarPoints.Add(grammarPoint);
            await dataContext.SaveChangesAsync();
        }
        public static async Task EditGrammarPointAsync(ApplicationDbContext dataContext, int id,  string title, string description, int dictionaryId)
        {
            GrammarPoint grammarPoint = await dataContext.GrammarPoints.FindAsync(id);
            if (grammarPoint == null)
            {
                throw new Exception("User not found");
            }
            grammarPoint.Title = description;
            grammarPoint.Description = description; 
            grammarPoint.DictionaryId = dictionaryId; 
            dataContext.Update(grammarPoint);
            await dataContext.SaveChangesAsync();
        }
        public static async Task DeleteGrammarPointByIdAsync(ApplicationDbContext dataContext, int id)
        {
            var grammarPointToRemove = await dataContext.GrammarPoints.FindAsync(id);
            dataContext.GrammarPoints.Remove(grammarPointToRemove);
            await dataContext.SaveChangesAsync();
        }  
        
        public static async Task<int> GetGrammarPointsCountAsync(ApplicationDbContext dataContext)
        {
            return await dataContext.GrammarPoints
                .CountAsync();
        }
        public static async Task<int> GetGrammarPointsCountAsync(ApplicationDbContext dataContext, string searchQuery)
        {
            return await dataContext.GrammarPoints
                .Where(gp => gp.Title.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase) 
                    || gp.Description.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase))
                .OrderBy(gp => gp.Title)
                .CountAsync();
        }


        public static async Task<IEnumerable<GrammarPoint>> GetGrammarPointsAsync(ApplicationDbContext dataContext)
        {
            return await dataContext.GrammarPoints
                .ToListAsync();
        }
        public static async Task<GrammarPoint> GetGrammarPointByIdAsync(ApplicationDbContext dataContext, int id)
        {
            return await dataContext.GrammarPoints.FindAsync(id);
        }
        public static async Task<IEnumerable<GrammarPoint>> GetGrammarPointsByDictionaryIdAsync(ApplicationDbContext dataContext, int id)
        {
            return await dataContext.GrammarPoints
                .Include(g => g.Dictionary)
                .Where(g => g.Dictionary.Id == id)
                .ToListAsync();
        }


        public static async Task<IEnumerable<GrammarPoint>> GetGrammarPointsByPageAsync(ApplicationDbContext dataContext, int page, int itemsPerPage)
        {
            return await dataContext.GrammarPoints
                .Skip(page * itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(gp => gp.Title)
                .ToListAsync();
        }
        public static async Task<IEnumerable<GrammarPoint>> GetGrammarPointsByPageAsync(ApplicationDbContext dataContext, int page, int itemsPerPage, string searchQuery)
        {
            return await dataContext.GrammarPoints
                .Where(gp => gp.Title.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase) 
                    || gp.Description.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase))
                .Skip(page * itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(gp => gp.Title)
                .ToListAsync();
        }
    }
}