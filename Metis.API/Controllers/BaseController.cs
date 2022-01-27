using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Metis.Models;
using Metis.Models.Store;

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
