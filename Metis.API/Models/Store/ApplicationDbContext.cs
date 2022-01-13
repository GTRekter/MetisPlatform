using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Metis.Models.Store
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Word> Words { get; set; }
        public DbSet<WordType> WordTypes { get; set; }
        public DbSet<Language> Languages { get; set; }
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
            this.SeedLanguages(builder);
            this.SeedWordTypes(builder);
            this.SeedRoles(builder);
            this.SeedUsers(builder);

            builder.Entity<User>(entity =>
            {
                entity.HasOne(u => u.Language)
                    .WithMany(d => d.Users)
                    .HasForeignKey(d => d.Id)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(f => f.Lessons)
                    .WithMany(g => g.Users)
                    .UsingEntity<Dictionary<string, object>>(
                        "UserLesson",
                        j => j.HasOne<Lesson>().WithMany().OnDelete(DeleteBehavior.Restrict),
                        j => j.HasOne<User>().WithMany().OnDelete(DeleteBehavior.Restrict));

                entity.ToTable("User");
            });
            builder.Entity<Role>()
                .ToTable("Roles");
            builder.Entity<Word>()
                .HasMany(w => w.Translations);
            builder.Entity<Lesson>()
                .ToTable("Lessons");
        }
        private void SeedLanguages(ModelBuilder builder)
        {
            builder.Entity<Language>().HasData(new List<Language>(){
                new Language(){ Id = 1, Name = "English", Code = "en-US", Enabled = true },
                new Language(){ Id = 2, Name = "Korean", Code = "ko-KR", Enabled = true },
                new Language(){ Id = 3, Name = "Italian", Code = "it-IT", Enabled = true }
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
                new Role(){ Id = 1, Name = "Administrator", Description = "" },
                new Role(){ Id = 2, Name = "Teacher", Description = "" },
                new Role(){ Id = 3, Name = "Student", Description = "" }
            });
        }
        public void SeedUsers(ModelBuilder builder)
        {
            var hasher = new PasswordHasher<User>();
            var user = new User
            {
                Id = 1,
                LanguageId = 1,
                Email = "admin@metis.com",
                RoleId = 1
            }; 
            builder.Entity<User>().HasData(user);  
            user.PasswordHash = hasher.HashPassword(user, "P@ssw0rd");   
        }
    }
}