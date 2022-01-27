using System;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading.Tasks;
using System.Linq;
using Metis.Models.Store;
using Microsoft.EntityFrameworkCore;

namespace Metis.Models.Managers
{
    public partial class StatisticManager
    {
        public static async Task AddStatisticAsync(ApplicationDbContext dataContext, int userId, int wordId, bool correct)
        {
            var statistic = new Statistic 
            { 
                User = await UserManager.GetUserByIdAsync(dataContext, userId),
                Word = await WordManager.GetWordByIdAsync(dataContext, wordId),
                Correct = correct
            };
            dataContext.Statistics.Add(statistic);
            await dataContext.SaveChangesAsync();
        }
        public static async Task<IEnumerable<Statistic>> GetStatisticsAsync(ApplicationDbContext dataContext, int userId)
        {
            return await dataContext.Statistics
                .Include(s => s.User)
                .Include(s => s.Word)
                .Where(s => s.User.Id == userId)
                .ToListAsync();
        }

        public static async Task<IEnumerable<Statistic>> GetStatisticsAsync(ApplicationDbContext dataContext, int id, DateTime startDate)
        {
            return await dataContext.Statistics
                .Include(s => s.Word)
                .Where(s => s.UserId == id && s.CreatedOn >= startDate)
                .ToListAsync();
        }

        // public static async Task<IEnumerable<IGrouping<Word, Statistic>>> GetCommonErrorByUserIdAsync(ApplicationDbContext dataContext, int id)
        // {
        //     return await dataContext.Statistics
        //         .Include(s => s.User)
        //         .Include(s => s.Word)
        //         .Where(s => s.User.Id == id)
        //         .Where(s => !s.Correct)
        //         .GroupBy(s => s.Word)
        //         .Select(g => new { Word = g, Count = g.Count() })
        //         .OrderByDescending(g => g.Count)
        //         .Take(5)
        //         .ToListAsync();
        // }
    }
}
