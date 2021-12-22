using System.Linq;
using System.Collections.Generic;
using Metis.Models.Store;

namespace Metis.Models.Managers
{
    public static class ProductManager
    {
        public static void AddProduct(ApplicationDbContext context, Word word)
        {
            context.Words.Add(word);
            context.SaveChanges();
        }
        public static Word GetWordById(ApplicationDbContext context, int id)
        {
            return context.Words.FirstOrDefault((p) => p.Id == id);
        }
        public static List<Word> GetAllWord(ApplicationDbContext context)
        {
            return context.Words.ToList();
        }
        public static void RemoveWordById(ApplicationDbContext context, int id)
        {
            var wordToRemove = context.Words.FirstOrDefault((p) => p.Id == id);
            context.Words.Remove(wordToRemove);
            context.SaveChanges();
        }
    }
}
