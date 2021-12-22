using Microsoft.EntityFrameworkCore;
using Metis.Models.Store;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Metis.API.Controllers;
using System.Collections.Generic;

namespace Training.MSTest
{
    [TestClass]
    public class MetisControllerTests
    {
        protected ApplicationDbContext _dbContext { get; private set; }
        
        [TestInitialize()]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("ApplicationDbContext")
                .Options;

            _dbContext = new ApplicationDbContext(options);
            List<Word> testWords = GetTestWords();
            for (int i = 0; i < testWords.Count; i++)
            {
                _dbContext.Words.Add(testWords[i]);
            }
            _dbContext.SaveChanges();
        }

        [TestCleanup]
        public void Cleanup()
        {
            _dbContext.Database.EnsureDeleted();
            _dbContext.Dispose();
        }

        [TestMethod]
        public void GetAllProducts_ShouldReturnAllProducts()
        {
            var controller = new DictionaryController(_dbContext);

            List<Word> result = controller.GetAllWords() as List<Word>;
            List<Word> testProducts = GetTestWords();
            Assert.AreEqual(testProducts.Count, result.Count);
        }

        [TestMethod]
        public void GetProduct_ShouldReturnCorrectProduct()
        {
            var controller = new DictionaryController(_dbContext);

            List<Word> testWords = GetTestWords();
            Word result = controller.GetWord(4) as Word;
            Assert.IsNotNull(result);
            Assert.AreEqual(testWords[3].Text, result.Text);
        }

        [TestMethod]
        public void RemoveProduct_ShouldReturnAllProductsExceptTheRemoved()
        {
            var controller = new DictionaryController(_dbContext);

            List<Word> testWords = GetTestWords();
            controller.RemoveWordById(4);
            List<Word> result = controller.GetAllWords() as List<Word>;
            Assert.AreNotEqual(testWords.Count, result.Count);
        }

        [TestMethod]
        public void AddProduct_ShouldAddProduct()
        {
            var controller = new DictionaryController(_dbContext);

            Word testProduct = new Word { Id = 5, Text = "워드 05", Description = "묘사 05", Example = "본보기 05" };
            controller.AddProduct(testProduct);
            Word result = controller.GetWord(5) as Word;
            Assert.AreEqual(testProduct.Text, result.Text);
        }

        [TestMethod]
        public void GetProduct_ShouldNotFindProduct()
        {
            var controller = new DictionaryController(_dbContext);

            var result = controller.GetWord(999);
            Assert.IsNull(result);
        }

        private List<Word> GetTestWords()
        {
            var testProducts = new List<Word>();
            testProducts.Add(new Word { Id = 1, Text = "워드 01", Description = "묘사 01", Example = "본보기 01" });
            testProducts.Add(new Word { Id = 2, Text = "워드 02", Description = "묘사 02", Example = "본보기 02" });
            testProducts.Add(new Word { Id = 3, Text = "워드 03", Description = "묘사 03", Example = "본보기 03" });
            testProducts.Add(new Word { Id = 4, Text = "워드 04", Description = "묘사 04", Example = "본보기 04" });
            testProducts.Add(new Word { Id = 4, Text = "워드 05", Description = "묘사 05", Example = "본보기 05" });
            return testProducts;
        }
    }
}
