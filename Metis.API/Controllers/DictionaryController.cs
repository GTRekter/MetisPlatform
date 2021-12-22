using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Metis.Models.Managers;
using Metis.Models.Store;

namespace Metis.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DictionaryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public DictionaryController(ApplicationDbContext context)
        {
            _context = context;
        }

        // [HttpPost]
        // [Route("AddProduct")]
        // public void AddProduct(Product product)
        // {
        //     ProductManager.AddProduct(_context, product);
        // }

        // [HttpPost]
        // [Route("DeleteProductById")]
        // public void DeleteProductById(int id)
        // {
        //     ProductManager.RemoveProductById(_context, id);
        // }

        [HttpGet]
        [Route("GetAllWords")]
        public IEnumerable<Word> GetAllWords()
        {
            return DictionaryManager.GetAllWord(_context);
        }

        [HttpGet]
        [Route("GetProduct")]
        public Product GetProduct(int id)
        {
            return DictionaryManager.GetWordById(_context, id);
        }
    }
}
