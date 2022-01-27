using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Metis.Models.Store;
using Metis.Models.Requests;
using Metis.Models.Managers;
using Metis.Models;
using Metis.Models.Responses;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace Metis.API.Controllers
{
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("[controller]")]
    public class StatisticController : BaseController
    {
        private readonly IConfiguration _configuration;
        public StatisticController(ApplicationDbContext dataContext, IConfiguration configuration)
            : base(dataContext)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("AddStatistic")]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> AddStatistic(int id, int wordId, bool correct)
        {
            var token = await HttpContext.GetTokenAsync("token");        
            await StatisticManager.AddStatisticAsync(_dataContext, id, wordId, correct);
            return Ok();
        }

        [HttpGet]
        [Route("GetStatisticsByUserId")]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetStatisticsByUserIdAsync(int id)
        {
            var roles = await StatisticManager.GetStatisticsAsync(_dataContext, id);
            return Ok(roles);
        }

        [HttpGet]
        [Route("getStatisticsByCurrentUserLastWeek")]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> getStatisticsByCurrentUserLastWeekAsync()
        {
            var user = await UserManager.GetUserByEmailAsync(_dataContext, User.Claims.FirstOrDefault(c => c.Type == "username").Value);
            DateTime startDate = DateTime.Now.AddDays(-7);
            var statistics = await StatisticManager.GetStatisticsAsync(_dataContext, user.Id, startDate);
            var groupedStatistics = statistics
                .GroupBy(s => s.CreatedOn.Date)
                .OrderBy(g => g.Key)
                .Select(g => new StatisticsByDateRespose
                {
                    Date = g.Key.DayOfWeek.ToString(),
                    Correct = g.Where(s => s.Correct).Count(),
                    Incorrect = g.Where(s => !s.Correct).Count()
                });
            
            List<StatisticsByDateRespose> response = new List<StatisticsByDateRespose>();
            foreach(DayOfWeek day in Enum.GetValues(typeof(DayOfWeek)))
            {
                var dayStatistics = groupedStatistics.Where(s => s.Date == day.ToString());
                if(dayStatistics.Count() > 0)
                {
                    response.Add(dayStatistics.First());
                }
                else
                {
                    response.Add(new StatisticsByDateRespose
                    {
                        Date = day.ToString(),
                        Correct = 0,
                        Incorrect = 0
                    });
                }
            }
            return Ok(response);
        }

        // [HttpGet]
        // [Route("GetCommonErrorByUserId")]
        // [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        // public async Task<IActionResult> GetCommonErrorByUserIdAsync(int id)
        // {
        //     var roles = StatisticManager.GetCommonErrorByUserIdAsync(_dataContext, id);
        //     return Ok(roles);
        // }
    }
}