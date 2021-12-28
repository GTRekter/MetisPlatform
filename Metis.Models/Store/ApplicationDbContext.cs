using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Metis.Models.Store
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)  
        {  
            base.OnModelCreating(builder);  
            this.SeedDictionaries(builder); 
            this.SeedWordTypes(builder); 
        }  

        private void SeedDictionaries(ModelBuilder builder)  
        {  
            IEnumerable<Dictionary> dictionaries = new List<Dictionary>()
            { 
                new Dictionary(){ Id = 1, Name = "Korean", Code = "ko-KO", Enabled = true, Primary = true },
                new Dictionary(){ Id = 2, Name = "English (en-US)", Code = "en-US", Enabled = true, Primary = false }
            }; 
            builder.Entity<Dictionary>().HasData(dictionaries);  
        }  

        private void SeedWordTypes(ModelBuilder builder)  
        {  
            IEnumerable<WordType> wordTypes = new List<WordType>()
            { 
                new WordType(){ Id = 1, Name = "Noun", Description = "" },
                new WordType(){ Id = 2, Name = "Adverb", Description = "" },
                new WordType(){ Id = 3, Name = "Verb", Description = "" },
                new WordType(){ Id = 4, Name = "Pronoum", Description = "" }
            }; 
            builder.Entity<WordType>().HasData(wordTypes);  
        }  
  
        public DbSet<Word> Words { get; set; }
        public DbSet<WordType> WordTypes { get; set; }
        public DbSet<Dictionary> Dictionaries { get; set; }
        public DbSet<Translation> Translations { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
    }
}