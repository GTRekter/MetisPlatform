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
        public DbSet<GrammarPoint> GrammarPoints { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            this.SeedDictionaries(builder);
            this.SeedWordTypes(builder);
            this.SeedRoles(builder);
            this.SeedUsers(builder);
            this.SeedUserRoles(builder);

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
            builder.Entity<Dictionary>().HasData(new List<Dictionary>(){
                new Dictionary(){ Id = 1, Name = "Korean", Code = "ko-KO", Enabled = true, Primary = true },
                new Dictionary(){ Id = 2, Name = "English (en-US)", Code = "en-US", Enabled = true, Primary = false }
            });
        }

        private void SeedWordTypes(ModelBuilder builder)
        {
            builder.Entity<WordType>().HasData(new List<WordType>(){
                new WordType(){ Id = 1, Name = "Noun", Description = "" },
                new WordType(){ Id = 2, Name = "Adverb", Description = "" },
                new WordType(){ Id = 3, Name = "Verb", Description = "" },
                new WordType(){ Id = 4, Name = "Pronoum", Description = "" },
                new WordType(){ Id = 5, Name = "Adjective", Description = "" }
            });
        }

        private void SeedRoles(ModelBuilder builder)
        {
            builder.Entity<Role>().HasData(new List<Role>(){
                new Role(){ Id = 1, Name = "Administrator", NormalizedName = "Administrator", Description = "" },
                new Role(){ Id = 2, Name = "Teacher", NormalizedName = "Teacher", Description = "" },
                new Role(){ Id = 3, Name = "Student", NormalizedName = "Student", Description = "" }
            });
        }

        public void SeedUsers(ModelBuilder builder)
        {
            var hasher = new PasswordHasher<User>();
            builder.Entity<User>().HasData(new User
            {
                Id = 1,
                UserName = "admin",
                NormalizedUserName = "admin",
                Email = "admin@metis.com",
                NormalizedEmail = "admin@metis.com",
                EmailConfirmed = true,
                PasswordHash = hasher.HashPassword(null, "P@ssw0rd"),
                SecurityStamp = string.Empty
            });       
        }

        public void SeedUserRoles(ModelBuilder builder)
        {
            builder.Entity<IdentityUserRole<int>>().HasData(new IdentityUserRole<int>
            {
                RoleId = 1,
                UserId = 1
            });
        }
    }
}