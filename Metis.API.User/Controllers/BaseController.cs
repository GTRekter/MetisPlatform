using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Metis.API.Models.Store;

namespace Metis.API.Controllers
{
    public class BaseController : ControllerBase
    {
        protected readonly ApplicationDbContext _dataContext;

        public BaseController(ApplicationDbContext dataContext)
        {
            _dataContext = dataContext;
        }
    }
}