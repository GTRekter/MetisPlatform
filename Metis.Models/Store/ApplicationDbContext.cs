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
        }  

        private void SeedDictionaries(ModelBuilder builder)  
        {  
            CultureInfo[] cultures = CultureInfo.GetCultures(CultureTypes.AllCultures & ~CultureTypes.NeutralCultures);
            IEnumerable<Dictionary> dictionaries = cultures.Select((c, index) => new Dictionary(){ Id = index + 1, Name = c.DisplayName, Code = c.Name, Primary = false, Enabled = false });
            builder.Entity<Dictionary>().HasData(dictionaries);  
        }  
  
        public DbSet<Word> Words { get; set; }
        public DbSet<WordType> WordTypes { get; set; }
        public DbSet<Dictionary> Dictionaries { get; set; }
        public DbSet<Translation> Translations { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
    }
}