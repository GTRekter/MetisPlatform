using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Metis.Models.Store
{
    public class ApplicationDbContext : IdentityDbContext<User, Role, int>
    {
        
        public DbSet<Word> Words { get; set; }
        public DbSet<WordType> WordTypes { get; set; }
        public DbSet<Dictionary> Dictionaries { get; set; }
        public DbSet<Translation> Translations { get; set; }
        public DbSet<Lesson> Lessons { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)  
        {  
            base.OnModelCreating(builder);  
            this.SeedDictionaries(builder); 
            this.SeedWordTypes(builder); 

            builder.Entity<User>()
                .ToTable("Users");

            builder.Entity<Role>()
                .ToTable("Roles");

            builder.Entity<IdentityUserRole<int>>()
                .ToTable("UserRoles")
                .HasKey(r => new { r.UserId, r.RoleId });

            builder.Entity<IdentityUserClaim<int>>()
                .ToTable("UserClaims");

            builder.Entity<IdentityRoleClaim<int>>()
                .ToTable("RoleClaims");

            builder.Entity<IdentityUserToken<int>>()
                .ToTable("UserTokens");

            builder.Entity<IdentityUserLogin<int>>()
                .ToTable("UserLogins")
                .HasKey(l => new { l.LoginProvider, l.ProviderKey, l.UserId });

            builder.Entity<Word>()
                .HasMany(w => w.Translations);
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
    }
}